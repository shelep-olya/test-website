const express = require("express");
const authViewsController = require("../controllers/authViewsController");
const router = express.Router();

router.get("/me", authViewsController.getMe);

router.get("/moreTests", authViewsController.getMoreTests);
router.get("/welcome", authViewsController.getWelcomePage);
router.get("/home", authViewsController.getHomePage);
router.get("/questionForm", authViewsController.getQuestionForm);

// router.get("/createTest", authViewsController.createTest);
module.exports = router;
