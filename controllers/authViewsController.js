const User = require("./../models/userModel");

exports.getMe = (req, res) => {
  const user = req.user;
  res.render("me", {
    title: "my account",
    user: true,
    data: { user },
  });
};
exports.getAddTestForm = (req, res) => {
  res.render("addTest", {
    title: "create your own test",
    user: true,
  });
};
exports.getMoreTests = (req, res) => {
  res.render("moreTests", {
    title: "more tests",
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
