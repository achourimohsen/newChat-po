const express = require("express");
const invitationControler = require("../controller/invitationControler");
const router = express.Router();

router.post("/addInvitation", invitationControler.addInvitation);

module.exports = router;
