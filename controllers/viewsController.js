const catchAsync = require("../utils/catch-async");
const Test = require("../models/finalTestModel");
exports.getHomePage = (req, res) => {
  res.render("main", {
    title: "home",
    user: false,
  });
};
exports.getTestPage = catchAsync(async (req, res, next) => {
  const testId = req.params.id;
  const newTest = await Test.findById(testId);

  if (!newTest) {
    return res.status(404).json({
      status: "fail",
      message: "Test not found",
    });
  }

  res.status(200).render("test", {
    newTest,
    user: false,
  });
});
exports.getAboutPage = (req, res) => {
  res.render("about", {
    title: "about",
    user: false,
  });
};
// exports.getTestPage = (req, res) => {
//   res.render("test", {
//     title: "test",
//     user: false,
//   });
// };
exports.getResultsPage = (req, res) => {
  res.render("results", {
    title: "your results",
    user: false,
  });
};
exports.logIn = (req, res) => {
  res.render("login", { title: "log in", user: false });
};
exports.signUp = (req, res) => {
  res.render("signup", { title: "sign up", user: false });
};
