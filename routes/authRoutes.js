const express = require("express");
const router = express.Router();

router.get("/me", (req, res) => {
  const locals = {
    title: "my account",
    isAuth: true,
  };
  res.render("me.ejs", { locals });
});

router.get("/moreTests", (req, res) => {
  const locals = {
    title: "more tests",
    isAuth: true,
  };
  res.render("moreTests.ejs", { locals });
});
router.get("/welcome", (req, res) => {
  const locals = {
    title: "welcome",
    isAuth: true,
  };
  res.render("/welcome.ejs", { locals });
});
router.get("/home", (req, res) => {
  const locals = {
    title: "home",
    isAuth: true,
  };
  res.render("home.ejs", { locals });
});

router.get("/createTest", (req, res) => {
  const locals = {
    title: "create test",
    isAuth: true,
  };
  res.render("createTest.ejs", { locals });
});
module.exports = router;
