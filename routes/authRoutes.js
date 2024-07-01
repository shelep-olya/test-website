const express = require("express");
const authViewsController = require("../controllers/authViewsController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/me", authController.protect, authViewsController.getMe);

router.get("/moreTests", authViewsController.getMoreTests);
router.get("/welcome", authViewsController.getWelcomePage);
router.get("/home", authController.protect, authViewsController.getHomePage);
router.post("/logout", authController.logout);
router.post("/deleteMe", authController.protect, authController.deleteMe);
module.exports = router;
