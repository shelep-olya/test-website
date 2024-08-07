const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const fs = require("fs");
const path = require("path");
const Test = require("./finalTestModel");

const defaultPhotoPath = path.join(__dirname, "../public/uploads/default.jpg");
const defaultPhotoData = fs.readFileSync(defaultPhotoPath);

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter your name."] },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email."],
  },
  photo: {
    data: { type: Buffer, default: defaultPhotoData },
    contentType: { type: String, default: "image/png" },
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same.",
    },
  },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test", default: 0 }],
  passwordResetToken: { type: String, default: null },
  passwordResetTokenExpires: { type: Date, default: null },
});

userSchema.pre("deleteOne", async function (next) {
  try {
    const userId = this.getQuery()["_id"];
    await Test.deleteMany({ author: userId });
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.pre("save", function (next) {
  if (this.isNew) {
    this.passwordResetToken = null;
    this.passwordResetTokenExpires = null;
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
