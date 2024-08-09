const validator = require("validator");
const catchAsync = require("./../utils/catch-async");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const { createAndSendToken } = require("./../utils/auth");
const { promisify } = require("util");
const AppError = require("../utils/app-error");
exports.signup = catchAsync(async (req, res, next) => {
  const { username, password, passwordConfirm, email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const locals = {
      title: "log in",
      text: "You already have an account. Please log in.",
      isAuth: true,
      message: null,
      showForgotPassword: false,
    };
    return res.render("login", { locals, user: false });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).render("signup", {
      message: "Invalid email format.",
      username,
      email,
      user: false,
    });
  }

  if (password.length < 8) {
    return res.status(400).render("signup", {
      message: "Password must be at least 8 characters long.",
      username,
      email,
      user: false,
    });
  }

  if (password !== passwordConfirm) {
    return res.status(400).render("signup", {
      message: "Passwords do not match.",
      username,
      email,
      user: false,
    });
  }

  const data = { name: username, password, passwordConfirm, email };
  const newUser = await User.create(data);

  const locals = {
    title: "welcome",
    text: "log in",
    isAuth: true,
    message: null,
  };
  createAndSendToken(newUser, 201, res, "login", locals);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const locals = {
    title: "home",
    text: "log in",
    isAuth: true,
    message: null,
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
    req.session.failedAttempts = (req.session.failedAttempts || 0) + 1;
    const showForgotPassword = req.session.failedAttempts >= 3;
    return res.status(401).render("login", {
      message: "Incorrect email or password.",
      email: email || "",
      password: password || "",
      user: false,
      showForgotPassword,
    });
  }
  req.session.failedAttempts = 0;
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
