const catchAsync = require("../utils/catch-async");
const testFunction = require("../utils/test-functionallity");
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
  const author = await User.findById(newTest.author);
  if (!newTest) {
    return res.status(404).json({
      status: "fail",
      message: "Test not found",
    });
  }
  res.status(200).render("test", {
    newTest,
    author: author.name,
    user: false,
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
    testFunction.postResFunc(req, res, test.results, testId);
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
  res.render("login", {
    title: "log in",
    user: false,
    message: null,
    showForgotPassword: 0,
  });
};
exports.signUp = (req, res) => {
  res.render("signup", { title: "sign up", user: false, message: null });
};
exports.getForgotPasswordPage = (req, res) => {
  res.render("forgotPassword", { title: "forgot password", user: false });
};
exports.getResetPasswordPage = (req, res) => {
  res.render("resetPassword", { user: false });
};
exports.getChangeAccountPage = (req, res) => {
  res.status(200).render("changeAccount", { user: false });
};
