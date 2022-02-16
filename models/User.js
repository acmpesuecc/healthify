const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name: "string",
    dob : "date",
    gender : "string",
    address : {

        general : "string", 
        city : "string",
        pincode : "number",

    },
    phone_number : "string",
    email : "string",
    medicines : "array", //Ids of medicines

});
const User = mongoose.model("User", schema);
module.exports = User;


