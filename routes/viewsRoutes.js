const express = require("express");
const { postResFunc } = require("../utils/test-functionallity");
const router = express.Router();

router.get("/", (req, res) => {
  const locals = {
    title: "home",
  };
  res.render("main.ejs", { locals });
});

// router.get("/me", (req, res) => {
//   const locals = {
//     title: "my account",
//   };
//   res.render("me.ejs", { locals });
// });

// router.get("/moreTests", (req, res) => {
//   const locals = {
//     title: "more tests",
//   };
//   res.render("moreTests.ejs", { locals });
// });

router.get("/about", (req, res) => {
  const locals = {
    title: "about",
  };
  res.render("about.ejs", { locals });
});

router.get("/results", (req, res) => {
  const locals = {
    title: "results",
  };
  res.render("results.ejs", { locals });
});

router.get("/test", (req, res) => {
  const locals = {
    title: "test",
  };
  res.render("test.ejs", { locals });
});

// router.get("/login", (req, res) => {
//   const locals = {
//     title: "log in",
//   };
//   res.render("login.ejs", { locals });
// });
router.get("/signup", (req, res) => {
  const locals = {
    title: "sign up",
  };
  res.render("signup.ejs", { locals });
});
// router.get("/welcome", (req, res) => {
//   const locals = {
//     title: "welcome",
//   };
//   res.render("/welcome.ejs", { locals });
// });
// router.get("/home", (req, res) => {
//   const locals = {
//     title: "home",
//   };
//   res.render("home.ejs", { locals });
// });

// router.get("/createTest", (req, res) => {
//   const locals = {
//     title: "create test",
//   };
//   res.render("createTest.ejs", { locals });
// });

router.post("/create-test-step1", (req, res) => {
  const locals = {
    title: "create test",
    numQuestions: req.body.numQuestions,
  };
  res.render("createTest.ejs", { locals });
});
router.post("/submit", (req, res) => postResFunc(req, res));

module.exports = router;
