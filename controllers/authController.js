const crypto = require("crypto");
const catchAsync = require("./../utils/catch-async");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/app-error");
const User = require("./../models/userModel");
const bcrypt = require("bcrypt");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res, redirectUrl) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  res.status(statusCode).redirect(redirectUrl);
};
exports.signup = catchAsync(async (req, res, next) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
  };
  const newUser = await User.create(data);
  createAndSendToken(newUser, 201, res, "/main.ejs");
});

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  if (!email || !password) {
    return next(new AppError("Please provide password & email.", 400));
  }
  console.log(req.body);
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect password or email.", 401));
  }
  createAndSendToken(user, 200, res, "/main.ejs");
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const newUser = await User.findById(decoded.id);
  if (!newUser) {
    return next(new AppError("The user no longer exists.", 401));
  }
  if (newUser.passwordChangedAt(decoded.iat)) {
    return next(
      new AppError(
        "User has changed password recently. Please login again.",
        401
      )
    );
  }
  req.user = newUser;
  next();
});
