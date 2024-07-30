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
  const data = {
    name: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
  };
  const newUser = await User.create(data);
  const locals = {
    title: "welcome",
    isAuth: true,
  };
  createAndSendToken(newUser, 201, res, "login.ejs", { locals });
});
exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const locals = {
    title: "home",
    isAuth: true,
  };

  if (!email || !password) {
    return res.status(400).render("login", {
      message: "Please provide both email and password.",
      email,
      password,
      user: false,
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).render("login", {
      message: "Invalid email format.",
      email,
      user: false,
    });
  }

  if (password.length < 8) {
    return res.status(400).render("login", {
      message: "Password must be at least 8 characters long.",
      email,
      password,
      user: false,
    });
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).render("login", {
      message: "Incorrect email or password.",
      email,
      user: false,
    });
  }

  createAndSendToken(user, 200, res, "home", { locals });
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
