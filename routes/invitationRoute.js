const express = require("express");
const invitationControler = require("../controller/invitationControler");
const router = express.Router();

router.post("/addInvitation", invitationControler.addInvitation);
router.get("/getInvitation/:userId", invitationControler.getSenderInvitations);
router.get(
    "/getReceiverInvitations/:userId",
    invitationControler.getReceiverInvitations
);

module.exports = router;
