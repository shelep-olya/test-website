const testController = require("./../controllers/testController");
const express = require("express");
const router = express.Router();
router
  .route("/auth/test/")
  .get(testController.getQuestionForm)
  .post(testController.addTest);

router.get("/addTest", testController.getQuestionForm);
router.get("/addTestQuestions", testController.getAddTestForm);
router.post("/submit-test", testController.addTest);

module.exports = router;
