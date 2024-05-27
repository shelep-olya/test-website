const testController = require("./../controllers/testController");
const express = require("express");
const router = express.Router();

router.post("/test", testController.addTest);
router.patch("/test", testController.updateTest);
router.delete("/test", testController.deleteTest);

module.exports = router;
