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
router.get(
  "/deleteWarning",
  authController.protect,
  userController.deleteWarning
);
router.post(
  "/updatePhoto/",
  authController.protect,
  userController.upload,
  userController.updatePhoto
);
router.route("/").get(userController.getAllUsers);

router.route("/:id").delete(userController.deleteUser);

module.exports = router;
