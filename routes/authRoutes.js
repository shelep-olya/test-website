const express = require("express");
const authController = require("./../controllers/authController");
const router = express.Router();

// router.post("/signup", authController.signup);
// router.post("/login", authController.login);
router.get("/me", (req, res) => {
  const locals = {
    title: "my account",
  };
  res.render("me.ejs", { locals });
});

router.get("/moreTests", (req, res) => {
  const locals = {
    title: "more tests",
  };
  res.render("moreTests.ejs", { locals });
});
router.get("/welcome", (req, res) => {
  const locals = {
    title: "welcome",
  };
  res.render("/welcome.ejs", { locals });
});
router.get("/home", (req, res) => {
  const locals = {
    title: "home",
  };
  res.render("home.ejs", { locals });
});

router.get("/createTest", (req, res) => {
  const locals = {
    title: "create test",
  };
  res.render("createTest.ejs", { locals });
});
module.exports = router;
