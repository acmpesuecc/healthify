const express = require("express");
const app = express();
const UserModel = require("./models/User");
require("dotenv").config();

const cors = require("cors");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.post("/register", (req, res) => {
  try {
    console.log("Register route called!");
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", (req, res) => {
  try {
    console.log("Login route called!");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log(`Server is running at ${port}`);
});
