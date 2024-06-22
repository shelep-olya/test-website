const crypto = require("crypto");
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
  createAndSendToken(newUser, 201, res, "welcome.ejs", { locals });
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
  const locals = {
    title: "home",
    isAuth: true,
  };
  createAndSendToken(user, 200, res, "home.ejs", { locals });
});
// exports.protect = catchAsync(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   if (!token) {
//     return next(
//       new AppError("You are not logged in. Please log in to get access.", 401)
//     );
//   }
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   const newUser = await User.findById(decoded.id);
//   if (!newUser) {
//     return next(new AppError("The user no longer exists.", 401));
//   }
// });
// // if (newUser.passwordChangedAt(decoded.iat)) {
// //   return next(
// //     new AppError(
// //       "User has changed password recently. Please login again.",
// //       401
// //     )
// //   );
// //   }
// //   req.user = newUser;
// //   next();
// // });
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
exports.isLoggedIn = async (req, res) => {
  if (req.cookies.jwt) {
    try {
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
    } catch (err) {
      return next();
    }
  }
  return next();
};
