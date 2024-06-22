const mongoose = require("mongoose");
const questionSchema = require("./questionModel");

const testSchema = new mongoose.Schema({
  questions: [questionSchema],
  author: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  results: [String],
});
const Test = mongoose.model("Test", testSchema);

module.exports = Test;
