const User = require("./../models/userModel");
const Test = require("./../models/finalTestModel");
const catchAsync = require("../utils/catch-async");
const testFunction = require("../utils/test-functionallity");

exports.getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).exec();

  const tests = await Test.find({ author: user });
  res.status(200).render("me", {
    tests,
    user,
  });
});

exports.submitTest = catchAsync(async (req, res, next) => {
  const testId = req.params.id;
  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({
        status: "fail",
        message: "Test not found",
      });
    }
    testFunction.authPostResFunc(req, res, test.results, testId);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

exports.getTestPage = catchAsync(async (req, res, next) => {
  const testId = req.params.id;
  const newTest = await Test.findById(testId);
  const author = await User.findById(newTest.author);
  if (!newTest) {
    return res.status(404).json({
      status: "fail",
      message: "Test not found",
    });
  }
  res.status(200).render("authTest", {
    newTest,
    author: author.name,
    user: req.user,
  });
});

exports.getAddTestForm = (req, res) => {
  res.render("addTest", {
    title: "create your own test",
    user: true,
  });
};

exports.getHomePage = (req, res) => {
  const user = req.user;
  res.render("home", {
    title: "home",
    user,
  });
};
