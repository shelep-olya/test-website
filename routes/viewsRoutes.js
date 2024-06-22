const express = require("express");
const { postResFunc } = require("../utils/test-functionallity");
const viewsController = require("./../controllers/viewsController");
const router = express.Router();

router.get("/", viewsController.getHomePage);
router.get("/about", viewsController.getAboutPage);
router.get("/results", viewsController.getResultsPage);
router.get("/test", viewsController.getTestPage);
router.get("/login", viewsController.logIn);
router.get("/signup", viewsController.signUp);
router.post("/submit", postResFunc);

module.exports = router;
