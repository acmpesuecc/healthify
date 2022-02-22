const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
require("dotenv").config();

const cors = require("cors");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, () =>
  console.log("Connected to database")
);

app.get("/", (req, res) => {
  res.send("ISA rod bro");
});

app.listen(3001, () => {
  console.log(`Server is running at ${port}`);
});
