const testController = require("./../controllers/testController");
const express = require("express");
const router = express.Router();

router.post("/submit-test", testController.addTest);

module.exports = router;
