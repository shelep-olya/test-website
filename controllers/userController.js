const AppError = require("./../utils/app-error");
const catchAsync = require("./../utils/catch-async");
const User = require("./../models/userModel");
exports.getAllUsers = catchAsync(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      satus: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
});
exports.getUser = (req, res) => {
  try {
    res.status(500).json({
      satus: "fail",
      message: "this route is not yet defined",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.updateUser = (req, res) => {
  try {
    res.status(500).json({
      satus: "fail",
      message: "this route is not yet defined",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.createUser = (req, res) => {
  try {
    res.status(500).json({
      satus: "fail",
      message: "this route is not yet defined",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.deleteUser = (req, res) => {
  try {
    res.status(500).json({
      satus: "fail",
      message: "this route is not yet defined",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
