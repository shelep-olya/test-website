const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    minlength: 8,
  },
  answers: {
    type: [String],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postedAt: Date,
});
const Test = mongoose.model("Test", testSchema);

module.exports = Test;
