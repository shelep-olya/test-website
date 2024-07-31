const validator = require("validator");
const catchAsync = require("./../utils/catch-async");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const { createAndSendToken } = require("./../utils/auth");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const AppError = require("../utils/app-error");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, password, passwordConfirm, email } = req.body;

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
    isAuth: true,
    message: null,
  };
  createAndSendToken(newUser, 201, res, "login", locals);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const locals = {
    title: "home",
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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/auth/resetPassword/${resetToken}`;
  const message = `You have requested a password reset. Please use the link below to reset your password:\n\n${resetUrl}\n\nThe link is valid for 10 minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset link sent.",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    return next(
      new AppError("Error sending email. Please try again later.", 500)
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token, password, passwordConfirm } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Token is invalid or has expired." });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  // 4. Log the user in and send a JWT token
  const jwt = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Password has been reset successfully.",
  });
});
