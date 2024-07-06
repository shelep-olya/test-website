const User = require("./../models/userModel");
const Test = require("./../models/finalTestModel");
const catchAsync = require("../utils/catch-async");

exports.getMe = (req, res) => {
  const user = req.user;
  res.render("me", {
    title: "my account",
    user: true,
    data: { user },
  });
};
exports.getMoreTests = catchAsync(async (req, res, next) => {
  try {
    const tests = await Test.find(); // Assuming Test is your Mongoose model
    res.render("moreTests", { tests, user: true }); // Pass tests to the EJS template
  } catch (err) {
    console.error("Error fetching tests:", err);
    // Handle error appropriately, e.g., return an error page
    res.status(500).send("Error fetching tests");
  }
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
