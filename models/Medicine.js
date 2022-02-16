const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name: "string",
    type : "string", //Pills, Injections, Solutions
    dosage : "number", 
    everyday : "boolean", 
    frequency : "number", 
    time_of_day : "string", // morning, afternoon, evening
    time : "string", // Need to be converted to time 
    interval : "number", // If its not a daily medicine, then this is the number of days ; If its a daily medicine, then this is the number of hours between two doses.
    start_date : "date",
    end_date : "date",

});
const Medicine = mongoose.model("Medicine", schema);
module.exports = Medicine;


