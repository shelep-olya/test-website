const handlerFactory = require("./handlerFactory");
const multer = require("multer");
const path = require("path");
const AppError = require("./../utils/app-error");
const catchAsync = require("./../utils/catch-async");
const User = require("./../models/userModel");
const Test = require("./../models/finalTestModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("photo");

exports.deleteMe = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  await User.deleteOne(user);

  res.status(204).redirect("/");
});

exports.deleteWarning = (req, res) => {
  const locals = {
    message:
      "if you accept your account will be deleted and all the tests you've created will be deleted too.",
    action: "deleteMe",
    formAction: "POST",
  };
  res.status(200).render("warning", { locals, user: req.user });
};
exports.updatePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }

  const filteredBody = { photo: req.file.path };

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).render("home", { user: updatedUser });
});
exports.getAllUsers = handlerFactory.getAll(User);
exports.deleteUser = handlerFactory.deleteOne(User);
