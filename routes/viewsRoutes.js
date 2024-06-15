const express = require("express");
const viewsController = require("./../controllers/viewsController");
const router = express.Router();

router.get("/", viewsController.getHomePage);
router.get("/about", viewsController.getAboutPage);
router.get("/results", viewsController.getResultsPage);
router.get("/test", viewsController.getTestPage);
router.get("/login", viewsController.logIn);
router.get("/signup", viewsController.signUp);
// router.get("/login", (req, res) => {

//   const locals = {
//     title: "log in",
//     isAuth: false,
//   };
//   res.render("login.ejs", { locals });
// });
// router.get("/signup", (req, res) => {
//   const locals = {
//     title: "sign up",
//     isAuth: false,
//   };
//   res.render("signup.ejs", { locals });
// });

module.exports = router;
