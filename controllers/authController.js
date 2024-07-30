const crypto = require("crypto");
const validator = require("validator");
const catchAsync = require("./../utils/catch-async");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/app-error");
const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const { createAndSendToken } = require("./../utils/auth");
const { promisify } = require("util");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, password, passwordConfirm, email } = req.body;

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).render("signup", {
      message: "Invalid email format.",
      username,
      email,
      user: false,
    });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).render("signup", {
      message: "Password must be at least 8 characters long.",
      username,
      email,
      user: false,
    });
  }

  // Check if passwords match
  if (password !== passwordConfirm) {
    return res.status(400).render("signup", {
      message: "Passwords do not match.",
      username,
      email,
      user: false,
    });
  }

  // Create the new user
  const data = { name: username, password, passwordConfirm, email };
  const newUser = await User.create(data);

  // Redirect to login page after signup
  const locals = {
    title: "welcome",
    isAuth: true,
    message: null, // Ensure message is initialized
  };
  createAndSendToken(newUser, 201, res, "login", locals);
});

// Login Controller
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const locals = {
    title: "home",
    isAuth: true,
    message: null, // Ensure message is initialized
  };

  if (!email || !password) {
    return res.status(400).render("login", {
      message: "Please provide both email and password.",
      email: email || "",
      password: password || "",
      user: false,
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).render("login", {
      message: "Invalid email format.",
      email: email || "",
      password: password || "",
      user: false,
    });
  }

  if (password.length < 8) {
    return res.status(400).render("login", {
      message: "Password must be at least 8 characters long.",
      email: email || "",
      password: password || "",
      user: false,
    });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).render("login", {
      message: "Incorrect email or password.",
      email: email || "",
      password: password || "",
      user: false,
    });
  }

  createAndSendToken(user, 200, res, "home", locals);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).send("User not found");
  }

  req.user = user;
  next();
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect("/");
};
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }
    return next();
  }
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id, { active: false });
  res.status(204).redirect("/");
});
