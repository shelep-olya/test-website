const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your full name."],
  },
  email: {
    type: String,
    required: [true, "Please enter valid email."],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number."],
  },
  subject: {
    type: String,
    required: [true, "Please enter subject."],
  },
  message: {
    type: String,
    required: [true, "Please enter your message."],
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
