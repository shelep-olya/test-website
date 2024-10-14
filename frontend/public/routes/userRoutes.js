const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get(
  "/deleteWarning",
  authController.protect,
  userController.deleteWarning
);

router.route("/").get(userController.getAllUsers);

router.route("/:id").delete(userController.deleteUser);

module.exports = router;
