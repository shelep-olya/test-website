const testController = require("./../controllers/testController");
const authController = require("./../controllers/authController");
const authViewsController = require("./../controllers/authViewsController");
const express = require("express");
const router = express.Router();
router.post("/addNumberOfQuestions", testController.addNumberOfQuestions);
router.post("/submitTest", authController.protect, testController.submitTest);

module.exports = router;
