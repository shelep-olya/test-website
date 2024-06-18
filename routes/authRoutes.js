const express = require("express");
const router = express.Router();

router.get("/me", (req, res) => {
  const locals = {
    title: "my account",
    user: true,
  };
  res.render("me.ejs", { locals });
});

router.get("/moreTests", (req, res) => {
  const locals = {
    title: "more tests",
    user: true,
  };
  res.render("moreTests.ejs", { locals });
});
router.get("/welcome", (req, res) => {
  const locals = {
    title: "welcome",
    user: true,
  };
  res.render("/welcome.ejs", { locals });
});
router.get("/home", (req, res) => {
  const locals = {
    title: "home",
    user: true,
  };
  res.render("/home.ejs", { locals });
});

router.get("/createTest", (req, res) => {
  const locals = {
    title: "create test",
    user: true,
  };
  res.render("createTest.ejs", { locals });
});
module.exports = router;
