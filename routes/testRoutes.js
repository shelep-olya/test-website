const testController = require("./../controllers/testController");
const authController = require("./../controllers/authController");
const viewsController = require("./../controllers/viewsController");
const express = require("express");
const router = express.Router();
router.post("/addNumberOfQuestions", testController.addNumberOfQuestions);
router.post("/submitTest", authController.protect, testController.submitTest);
router.get("/myTests", authController.protect, testController.getMyTests);

router.get("/test/:id", authController.protect, viewsController.getTestPage);
module.exports = router;
