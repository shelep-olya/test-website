const crypto = require("crypto");
const catchAsync = require("./../utils/catch-async");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/app-error");
const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const { createAndSendToken } = require("./../utils/auth");
const { promisify } = require("util");
// // exports.signup = catchAsync(async (req, res, next) => {
// //   const email = req.body.email;

// //   const data = {
// //     name: req.body.username,
// //     password: req.body.password,
// //     passwordConfirm: req.body.passwordConfirm,
// //     email: email,
// //   };
// //   console.log(data);
// //   let user = await User.findOne({ email });
// //   if (user) return res.redirect("/");

// //   user = new User({ data });
// //   await user.save();
// //   res.redirect("/login");
// // });

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
  console.log(req.body);
  if (!email || !password) {
    return next(new AppError("Please provide password & email.", 400));
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect password or email.", 401));
  }
  const locals = {
    title: "home",
    isAuth: true,
  };
  createAndSendToken(user, 200, res, "home.ejs", { locals });
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
// // exports.protect = catchAsync(async (req, res, next) => {
// //   let token;
// //   if (
// //     req.headers.authorization &&
// //     req.headers.authorization.startsWith("Bearer")
// //   ) {
// //     token = req.headers.authorization.split(" ")[1];
// //   }
// //   if (!token) {
// //     return next(
// //       new AppError("You are not logged in. Please log in to get access.", 401)
// //     );
// //   }
// //   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

// //   const newUser = await User.findById(decoded.id);
// //   if (!newUser) {
// //     return next(new AppError("The user no longer exists.", 401));
// //   }
// // });
// // // if (newUser.passwordChangedAt(decoded.iat)) {
// // //   return next(
// // //     new AppError(
// // //       "User has changed password recently. Please login again.",
// // //       401
// // //     )
// // //   );
// // //   }
// // //   req.user = newUser;
// // //   next();
// // // });
// exports.logout = (req, res) => {
//   res.clearCookie("jwt");
//   res.redirect("/");
// };
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
