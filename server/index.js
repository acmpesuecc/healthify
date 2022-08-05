const express = require("express");
const app = express();
require("./config/connect").connect();
require("dotenv").config();
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
var multer = require("multer");
const ocr = require("./ocr.js");

// s

const enc = require("./config/encryptionConfig.js");
const cors = require("cors");
const User = require("./models/User");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

function sendMail(output, to) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_HOST_USERNAME,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Anirudh from Healthify" <healthify2022@gmail.com>', // sender address
    to: to, // list of receivers
    subject: "Healthify Contact", // Subject line
    text: "This is a computer generated email, please do not reply to this!", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("Email has been sent");
  });
}

app.get("/", (req, res) => {
  res.status(200).send("Welcome!");
});

app.post("/register", async (req, res) => {
  try {
    const { name, password, dob, gender, phone_number, email } = req.body;
    if (!(name && password && dob && gender && phone_number && email)) {
      res.status(400).send("Required inputs are missing!");
    }
    //Checking if user exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    //Create user in database
    const user = await User.create({
      name,
      dob,
      gender,
      password: encryptedPassword,
      verified: false,
      phone_number,
      email: email.toLowerCase(),
    });

    //Create a JWT
    // const token = jwt.sign(
    //   { user_id: user._id, email },
    //   process.env.TOKEN_KEY, //Use Private Key instead
    //   enc.signOptions
    // );
    var output =
      "Click on below link to verify <b> => http://192.168.1.18:3001/verifyuser/" +
      user._id;
    //Send Email
    sendMail(output, email); // After this, send a flag to user to verify email

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.get("/verifyuser/*", function (req, res) {
  var idx = req.url.slice(12, 1000);
  //check if user is verified
  User.findOne({ _id: idx }, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user.verified) {
      res.send("You are already verified. Please login");
    } else {
      User.updateOne(
        {
          _id: idx,
        },
        {
          $set: {
            verified: true,
          },
        },
        function (err, obj1) {
          if (err) {
            console.log("ERROR" + err);
          } else {
            console.log("VERIFIED");
            // console.log(obj1);
            res.send(
              "Your account is now verified. Welcome to Healthify! You can now login."
            );
          }
        }
      );
    }
  });
});

app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("An email and password is required");
    }
    // Validate if user exist in our database
    else {
      const user = await User.findOne({ email });
      console.log(user);
      console.log(email);

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            dob: user.dob,
            name: user.name,
          },
          process.env.TOKEN_KEY,
          enc.signOptions
        );

        // save user token in database
        user.token = token;

        // user
        // res.status(200).json({user:user,token:token});
        jwt.verify(
          token,
          process.env.TOKEN_KEY,
          enc.verifyOptions,
          (err, decoded) => {
            if (err) {
              res.status(401).send("Invalid Token");
            }
            res.status(200).json({ token });
          }
        );
      } else {
        console.log("User not found");
        res
          .status(400)
          .send(
            "Invalid Credentials: Either user does not exist or password is incorrect"
          );
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//Scrape data from websites

class medDetails {
  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

async function getNetMeds(medName) {
  console.log("Scraping data from NetMeds");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  var arr = [];
  await page.goto(
    "https://www.netmeds.com/catalogsearch/result/" +
      medName.replace("+", " ") +
      "/all"
  );
  await page.waitForTimeout(1000);

  // await page.screenshot({path: 'screenshot.png'});

  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".info")).map(
      (x) => x.innerText
    );
  });
  const prices = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("span.final-price")).map(
      (x) => x.innerText
    );
  });
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".drug_img img")).map(
      (x) => x.src
    );
  });

  for (i = 0; i < names.length; i++) {
    // console.log(`${names[i]}: price:${prices[i]}, image:${images[i]}`);
    var item = new medDetails(names[i], prices[i], images[i]);
    arr.push(item);
  }
  await browser.close();
  // result = JSON.stringify(arr);
  console.log("Scraping data from NetMeds completed");
  console.log(arr);
  return arr;
}
async function getPharmeasy(medName) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 2100 });
  await page.goto("https://pharmeasy.in/search/all?name=" + medName);
  var arr = [];
  // await page.screenshot({path: 'screenshot.png'});

  const names = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(".ProductCard_medicineName__17En6")
    )
      .map((x) => x.innerText)
      .splice(0, 10);
  });
  const prices = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".ProductCard_ourPrice__3fkJf"))
      .map((x) => x.innerText)
      .splice(0, 10);
  });
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("img.pe-lazy")).map(
      (x) => x.src
    );
  });

  for (i = 0; i < names.length; i++) {
    // console.log(`${names[i]}: price:${prices[i]}, image:${images[i]}`);
    var item = new medDetails(names[i], prices[i], images[i]);
    arr.push(item);
  }
  await browser.close();
  // result = JSON.stringify(arr);
  // console.log("Scraping data from Pharmeasy completed");
  return arr;
}

// getPharmeasy("crocin");
// getNetMeds("crocin");
// Example requests
// http://localhost:3001/getMeds?medicine=dolo&source=pharmeasy
// http://localhost:3001/getMeds?medicine=crocin&source=netmeds
//Chedk similarity of two strings based on levenshtein distance (Stackoverflow)
function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

async function getMedsRoute(medName)
{
    if (medName == null) {
      // res.status(400).send("Please enter a medicine name");
      console.log("Please enter a medicine name");
    }
    //if medName has space
    else if (medName.indexOf(" ") != -1) {
      medName = medName.replace(" ", "+");
    }

    // console.log("medName: " + medName);

    pharm_easy_medicines = await getPharmeasy(medName);
    for (i = 0; i < pharm_easy_medicines.length; i++) {
      pharm_easy_medicines[i].source = "PharmEasy";
    }
    net_meds_medicines = await getNetMeds(medName);
    //add source netmeds to all objects in the array
    for (i = 0; i < net_meds_medicines.length; i++) {
      net_meds_medicines[i].source = "NetMeds";
    }

    all_med_details = net_meds_medicines.concat(pharm_easy_medicines);
    // console.log(all_med_details);
    medName = medName.replace("+", " ");

    //sort the medicine names without Strip of , Bottle of , by levenshtein distance by using the levenshtein distance function with medName
    var sorted_meds = all_med_details.sort(function (a, b) {
      // console.log(similarity(medName, a.name.replace("Strip Of ", "").replace("Bottle Of ", "")));
      return (
        similarity(
          medName,
          a.name.replace("Strip Of ", "").replace("Bottle Of ", "")
        ) -
        similarity(
          medName,
          b.name.replace("Strip Of ", "").replace("Bottle Of ", "")
        )
      );
    });
    // console.log(sorted_meds);
    //Remove all the medicines which do not contain the medName ignoring case

    sorted_meds = sorted_meds.filter(function (item) {
      return item.name
        .toLowerCase()
        .includes(medName.toLowerCase().split(" ")[0]);
    });

    return sorted_meds;
}

app.get("/getMeds", async (req, res) => {
  // console.log("here in get meds");
  try {
    // Pass medicine name as a parameter in the URL
    console.log(typeof(req.query.medicine));
    sortedMeds = await getMedsRoute(req.query.medicine);
    res.end(JSON.stringify(sortedMeds));
    // console.log(medicines);
  } catch (err) {
    console.log(err);
  }
});


app.post("/upload", async (req, res) => {
    console.log(req.body);
    //Use computerVision function from ocr.js
    let medNameText = ocr(req.body.link);
    console.log(typeof(medNameText));
    console.log(String(medNameText));
    result = getMedsRoute(String(medNameText));
    console.log(result);
    res.send(result);
});

app.listen(3001, () => {
  console.log(`Server is running at ${port}`);
});
