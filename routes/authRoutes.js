const express = require("express");
const authViewsController = require("../controllers/authViewsController");
const testController = require("../controllers/testController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/me", authController.protect, authViewsController.getMe);
router.get("/moreTests", authController.protect, testController.getMoreTests);
router.get("/welcome", authViewsController.getWelcomePage);
router.get("/home", authController.protect, authViewsController.getHomePage);
router.post("/logout", authController.logout);

router.get(
  "/addTest",
  authController.protect,
  authViewsController.getAddTestForm
);
router.post("/deleteMe", authController.protect, authController.deleteMe);
router.get(
  "/authTest/:id",
  authController.protect,
  authViewsController.getTestPage
);
router.post(
  "/submitAuthTest/:id",
  authController.protect,
  authViewsController.submitTest
);
module.exports = router;
