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

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
    token,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const data = {
    name: req.body.username,
    pasword: req.body.pasword,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
  };
  const newUser = await User.create(data);
  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const pasword = req.body.pasword;
  console.log(req.body);
  if (!email || !pasword) {
    return next(new AppError("Please provide password & email.", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(pasword, user.password))) {
    return next(new AppError("Incorrect password or email.", 401));
  }
  createAndSendToken(user, 200, res);
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
