const express = require("express");
const router = express.Router();

router.get("/" || "/main", (req, res) => {
  const locals = "home";
  res.render("main.ejs", { locals });
});
// app.get("/me.ejs", (req, res) => {
//     res.render("me");
//   });
//   app.get("/moreTests.ejs", (req, res) => {
//     res.render("moreTests");
//   });
router.get("/me", (req, res) => {
  const locals = "My account";
  res.render("me.ejs", { locals });
});

router.get("/moreTests", (req, res) => {
  const locals = "More tests";
  res.render("moreTests.ejs", { locals });
});
// app.get("/about.ejs", (req, res) => {
//     res.render("about");
//   });
router.get("/about", (req, res) => {
  const locals = "about";
  res.render("about.ejs", { locals });
});
//   app.get("/results.ejs", (req, res) => {
//     res.render("results");
//   });
router.get("/results", (req, res) => {
  const locals = "results";
  res.render("results.ejs", { locals });
});
//   app.get("/test.ejs", (req, res) => {
//     res.render("test");
//   });
router.get("/test", (req, res) => {
  const locals = "test";
  res.render("test.ejs", { locals });
});
module.exports = router;
