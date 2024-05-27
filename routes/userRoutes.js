const express = require("express");
const authController = require("./../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/home.ejs", (req, res) => {
  res.render("home");
});
router.get("/welcome.ejs", (req, res) => {
  res.render("welcome");
});

module.exports = router;
