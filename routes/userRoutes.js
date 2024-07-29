const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const authViewsController = require("./../controllers/authViewsController");
const { postResFunc } = require("../utils/test-functionallity");

const router = express.Router();

// router.post("/submit", (req, res) => postResFunc(req, res));

router.post("/signup", authController.signup);
router.post("/login", authController.login);

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
