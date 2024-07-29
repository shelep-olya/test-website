const catchAsync = require("../utils/catch-async");
const postResFunc = require("../utils/test-functionallity");
const Test = require("../models/finalTestModel");
const User = require("../models/userModel");
exports.getHomePage = (req, res) => {
  res.render("main", {
    title: "home",
    user: false,
  });
};
exports.getTestPage = catchAsync(async (req, res, next) => {
  const testId = req.params.id;
  const newTest = await Test.findById(testId);
  const authorId = newTest.author;
  const author = await User.findById(authorId);
  if (!newTest) {
    return res.status(404).json({
      status: "fail",
      message: "Test not found",
    });
  }

  res.status(200).render("test", {
    newTest,
    author: author.name,
    user: req.user,
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
    const layout = "results";
    postResFunc(req, res, test.results, testId, layout);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});
exports.getAboutPage = (req, res) => {
  res.render("about", {
    title: "about",
    user: false,
  });
};

exports.logIn = (req, res) => {
  res.render("login", { title: "log in", user: false });
};
exports.signUp = (req, res) => {
  res.render("signup", { title: "sign up", user: false });
};
