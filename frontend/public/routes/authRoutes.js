const express = require("express");
const authViewsController = require("../controllers/authViewsController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const testController = require("../controllers/testController");
const router = express.Router();

router.get("/me", authController.protect, authViewsController.getMe);
router.get("/moreTests", authController.protect, testController.getMoreTests);
router.get("/home", authController.protect, authViewsController.getHomePage);
router.post("/logout", authController.logout);
router.get(
  "/addTest",
  authController.protect,
  authViewsController.getAddTestForm
);

router.post("/deleteMe", authController.protect, userController.deleteMe);
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
