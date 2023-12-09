const express = require("express");
const { getNotifications } = require("../controller/notificationController");
const router = express.Router();

router.get("/notifications/:userId", getNotifications);

module.exports = router;
