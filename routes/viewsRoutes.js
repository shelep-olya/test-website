const express = require("express");
const { postResFunc } = require("../utils/test-functionallity");
const router = express.Router();

router.get("/", (req, res) => {
  const locals = {
    title: "home",
    isAuth: false,
  };
  res.render("main.ejs", { locals });
});

router.get("/about", (req, res) => {
  const locals = {
    title: "about",
    isAuth: false,
  };
  res.render("about.ejs", { locals });
});

router.get("/results", (req, res) => {
  const locals = {
    title: "results",
    isAuth: false,
  };
  res.render("results.ejs", { locals });
});

router.get("/test", (req, res) => {
  const locals = {
    title: "test",
    isAuth: false,
  };
  res.render("test.ejs", { locals });
});
router.get("/login", (req, res) => {
  const locals = {
    title: "log in",
    isAuth: false,
  };
  res.render("login.ejs", { locals });
});
router.get("/signup", (req, res) => {
  const locals = {
    title: "sign up",
    isAuth: false,
  };
  res.render("signup.ejs", { locals });
});
router.post("/submit", (req, res) => postResFunc(req, res));
module.exports = router;
