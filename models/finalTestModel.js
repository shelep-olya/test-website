const mongoose = require("mongoose");
const User = require("./userModel");
const testBlockSchema = require("./testBlockSchema");

const testSchema = new mongoose.Schema({
  numOfQuestions: {
    type: Number,
    required: [true, "Please enter number of questions."],
    validate: {
      validator: function (v) {
        return this.testBlocks.length === v;
      },
      message: (props) =>
        `Number of questions (${props.value}) does not match the number of test blocks (${this.testBlocks.length}).`,
    },
  },
  testBlocks: {
    type: [testBlockSchema],
    validate: {
      validator: function (v) {
        return v.length === this.numOfQuestions;
      },
      message: (props) =>
        `Number of test blocks (${props.value.length}) does not match the number of questions (${this.numOfQuestions}).`,
    },
  },
  author: {
    type: String,
    required: [true, "Please provide your username or pseudonym."],
    default: async function () {
      const user = await User.findById(this.authorId);
      return user ? user.name : "";
    },
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  numberOfResults: {
    type: Number,
    required: [true, "Please enter number of test results."],
    validate: {
      validator: function (v) {
        return this.results.length === v;
      },
      message: (props) =>
        `Number of results (${props.value}) does not match the number of results in the array (${this.results.length}).`,
    },
  },
  results: {
    type: [String],
    required: [true, "Please enter an array of results."],
    validate: {
      validator: function (v) {
        return v.length === this.numberOfResults;
      },
      message: (props) =>
        `Number of results (${props.value.length}) does not match the number of results expected (${this.numberOfResults}).`,
    },
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;