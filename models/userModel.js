const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, enter name."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email."],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please enter valid email."],
  },
  photo: String,

  password: {
    type: String,
    required: [true, "Please enter password."],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password."],
    validate: {
      validator: function (el) {
        if (el === this.password) {
          return;
        } else {
          message: "password are not the same.";
        }
      },
    },
  },
  passwordChangedAt: Date,
  passwordResetsToken: String,
  passwordResetsExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: true,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetsExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
