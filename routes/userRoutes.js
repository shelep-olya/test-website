const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
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
// router.get("/welcome", (req, res) => {
//   const locals = {
//     title: "welcome",
//     isAuth: true,
//   };
//   res.render("/welcome.ejs", { locals });
// });
// router.get("/home", (req, res) => {
//   const locals = {
//     title: "home",
//     isAuth: true,
//   };
//   res.render("home.ejs", { locals });
// });

router.get("/createTest", (req, res) => {
  const locals = {
    title: "create test",
    isAuth: true,
  };
  res.render("createTest.ejs", { locals });
});

router.post("/create-test-step1", (req, res) => {
  const locals = {
    title: "create test",
    isAuth: false,
    numQuestions: req.body.numQuestions,
  };
  res.render("createTest.ejs", { locals });
});
router.post("/submit", (req, res) => postResFunc(req, res));

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(authController.protect);

router.get("/me", userController.getMe);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
