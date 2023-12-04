const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.get("/gets", userController.gets);

// router.get("/create", userController.createMessage)

module.exports = router;
