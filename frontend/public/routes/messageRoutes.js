const express = require("express");
const messageController = require("../controllers/messageController");
const router = express.Router();

router.post("/sendMessage", messageController.sendMessage);

module.exports = router;
