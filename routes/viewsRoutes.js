const express = require("express");
const viewsController = require("./../controllers/viewsController");
const router = express.Router();

router.get("/test/:id", viewsController.getTestPage);
router.get("/", viewsController.getHomePage);
router.get("/about", viewsController.getAboutPage);
router.get("/login", viewsController.logIn);
router.get("/signup", viewsController.signUp);
router.post("/test/:id", viewsController.submitTest);
router.get("/forgotPassword", viewsController.getForgotPasswordPage);

module.exports = router;
