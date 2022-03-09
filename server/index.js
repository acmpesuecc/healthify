const express = require("express");
const app = express();
const UserModel = require("./models/User");
require("./config/connect").connect();
require("dotenv").config();
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const cors = require("cors");
const User = require("./models/User");
const { emit } = require("./models/User");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

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
      phone_number,
      email: email.toLowerCase(),
    });

    //Create a JWT
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
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

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token in database
        user.token = token;
  
        // user
        res.status(200).json({user:user,token:token});
      } else {
        console.log("User not found");
        res.status(400)
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
