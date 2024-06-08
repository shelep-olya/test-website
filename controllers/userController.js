const handlerFactory = require("./handlerFactory");
const AppError = require("./../utils/app-error");
const catchAsync = require("./../utils/catch-async");
const User = require("./../models/userModel");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  const user = User.findById(req.params.id);
  res.status(200).render("me");
  console.log(user);
};
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("You cannot change password here.", 400));
  }

  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      data: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.getAllUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.createUser = handlerFactory.createOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
