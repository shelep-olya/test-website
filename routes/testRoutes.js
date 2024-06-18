const testController = require("./../controllers/testController");
const express = require("express");
const router = express.Router();

router.get("/addTest", testController.getQuestionForm);
router.get("/addTestQuestions", testController.getAddTestForm);
router.post("/submit-test", testController.addTest);

module.exports = router;
