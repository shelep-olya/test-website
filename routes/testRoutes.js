const testController = require("./../controllers/testController");
const express = require("express");
const router = express.Router();
router.get("/getAllTests", testController.getAllTests);
router.post("/addNumberOfQuestions", testController.addNumberOfQuestions);
router.post("/submitTest", testController.submitTest);
module.exports = router;
