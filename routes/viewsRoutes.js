const express = require("express");
const viewsController = require("./../controllers/viewsController");
const testController = require("./../controllers/testController");
const router = express.Router();
router.get("/test/:id", viewsController.getTestPage);
router.get("/", viewsController.getHomePage);
router.get("/about", viewsController.getAboutPage);
router.get("/results", viewsController.getResultsPage);
router.get("/test", viewsController.getTestPage);
router.get("/login", viewsController.logIn);
router.get("/signup", viewsController.signUp);
router.get("/getAllTests", testController.getAllTests);
router.post("/submitTest/:id", viewsController.submitTest);

module.exports = router;
