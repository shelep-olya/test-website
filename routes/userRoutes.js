const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/home.ejs", (req, res) => {
  res.render("home");
});
router.get("/welcome.ejs", (req, res) => {
  res.render("welcome");
});

router.use(authController.protect);

router.get("/me", userController.getMe, userController.getUser);
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
