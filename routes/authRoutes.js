const express = require("express");
const authViewsController = require("../controllers/authViewsController");
const router = express.Router();

router.get("/me", authViewsController.getMe);

router.get("/moreTests", authViewsController.getMoreTests);
router.get("/welcome", authViewsController.getWelcomePage);
router.get("/home", authViewsController.getHomePage);
module.exports = router;
