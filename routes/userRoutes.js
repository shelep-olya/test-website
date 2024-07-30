const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const viewsController = require("../controllers/viewsController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.get("/resetPassword/:token", viewsController.getResetPasswordPage);
router.patch("/resetPassword", authController.resetPassword);
router.patch("/updateMe", userController.updateMe);
router.get(
  "/deleteWarning",
  authController.protect,
  userController.deleteWarning
);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.upload, userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
