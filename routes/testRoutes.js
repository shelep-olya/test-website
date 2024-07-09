const testController = require("./../controllers/testController");
const express = require("express");
const router = express.Router();
router.get("/myTests", testController.getAllTestsOfOne);
router.post("/addNumberOfQuestions", testController.addNumberOfQuestions);
router.post("/submitTest", testController.submitTest);
module.exports = router;
