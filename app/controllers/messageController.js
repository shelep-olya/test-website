const Message = require("../models/messageModel");
const catchAsync = require("../utils/catch-async");

exports.sendMessage = catchAsync(async (req, res, next) => {
  const message = await Message.create({
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    subject: req.body.subject,
    message: req.body.message,
  });

  res.status(201).redirect("/");
});
