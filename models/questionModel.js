const mongoose = require("mongoose");

exports.questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [String],
});
