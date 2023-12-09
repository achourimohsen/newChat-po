const mongoose = require("mongoose");
const Invitation = require("../model/invitationModel");
const userModel = require("../model/userModel");
const Notification = require("../model/notificationModel");

const addInvitation = async (data, socket) => {
    const { sender, receiver } = data;

    try {
        const existingInvitation = await Invitation.findOne({
            sender,
            receiver,
        });

        if (existingInvitation) {
            return socket.emit(
                "getInvitationResponse",
                "You have already invited this friend."
            );
        }

        const notification = new Notification({
            userId: receiver,
            message: "sended invitation to you",
            senderId: sender,
        });

        await notification.save();

        const invitation = new Invitation({
            sender,
            receiver,
        });

        await invitation.save();

        const newInvitation = await Invitation.findOne({ sender, receiver });

        const receiverUser = await userModel.findByIdAndUpdate(receiver, {
            $push: { invitations: newInvitation._id },
        });

        const senderUser = await userModel.findByIdAndUpdate(sender, {
            $push: { invitations: newInvitation._id },
        });

        socket.emit("getInvitationResponse", { invitation, notification });
    } catch (err) {
        socket.emit(err);
    }
};

const getSenderInvitations = async (req, res) => {
    const { userId } = req.params;
    try {
        const getReceiverInvitations = await Invitation.find({
            sender: userId,
        })
            .populate("receiver", "username email")
            .select("-_id -__v");

        res.status(200).json(getReceiverInvitations);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getReceiverInvitations = async (req, res) => {
    const { userId } = req.params;

    try {
        const invitationsToMe = await Invitation.find({
            receiver: userId,
        })
            .populate("sender", "username emeil ")
            .select("-receiver -__v ");
        res.status(200).json(invitationsToMe);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    addInvitation,
    getSenderInvitations,
    getReceiverInvitations,
};
