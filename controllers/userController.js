const handlerFactory = require("./handlerFactory");
const multer = require("multer");
const path = require("path");
const AppError = require("./../utils/app-error");
const catchAsync = require("./../utils/catch-async");
const User = require("./../models/userModel");

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
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("photo");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

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
  upload(req, res, async (err) => {
    if (err) {
      return next(new AppError(err, 400));
    } else {
      const filteredBody = filterObj(req.body, "name", "email");
      if (req.file) {
        filteredBody.photo = req.file.filename;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).redirect("home");
    }
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    photo: {
      data: req.file.filename,
      contentType: "image/png",
    },
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  user.save();
  res.status(201).json(user);
});

exports.getAllUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
