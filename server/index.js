const express = require("express");
const app = express();
const UserModel = require("./models/User");
require("./config/connect").connect();
require("dotenv").config();
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const enc = require("./config/encryptionConfig.js");
const cors = require("cors");
const User = require("./models/User");
const { emit } = require("./models/User");
const nodemailer = require("nodemailer");
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

app.listen(3001, () => {
  console.log(`Server is running at ${port}`);
});
