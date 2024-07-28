const User = require("./../models/userModel");
const Test = require("./../models/finalTestModel");
const catchAsync = require("../utils/catch-async");

exports.getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).exec();

  const tests = await Test.find({ author: user });
  res.status(200).render("me", {
    tests,
    user,
  });
});

exports.getAddTestForm = (req, res) => {
  res.render("addTest", {
    title: "create your own test",
    user: true,
  });
};

exports.getWelcomePage = (req, res) => {
  res.render("welcome", {
    title: welcome,
    user: true,
  });
};
exports.getHomePage = (req, res) => {
  const user = req.user;
  res.render("home", {
    title: "home",
    user: true,
    user,
  });
};
