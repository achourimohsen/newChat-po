// const mongoose = require("mongoose");
// const Invitation = require("../model/invitationModel");
// const ObjectId = require("mongodb");

// const addInvitation = async (req, res) => {
//     const { sender, receiver } = req.body;
//     console.log(sender, receiver);
//     console.log(typeof sender);

//     const senderObjectId = new ObjectId(sender);

//     // const senderObjectId = mongoose.Types.ObjectId(sender);
//     // const receiverObjectId = mongoose.Types.ObjectId(receiver);

//     try {
//         const invitation = new Invitation({
//             sender: senderObjectId,
//             receiver: receiverObjectId,
//         });

//         await invitation.save();
//         res.status(200).json(invitation);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// module.exports = {
//     addInvitation,
// };

const mongoose = require("mongoose");
const Invitation = require("../model/invitationModel");
const userModel = require("../model/userModel");

const addInvitation = async (req, res) => {
    const { sender, receiver } = req.body;

    try {
        const invitationOne = await Invitation.find({ sender, receiver });

        if (invitationOne.length > 0) {
            return res.send("you'r invited this frind ");
        }

        const invitation = new Invitation({
            sender,
            receiver,
        });

        await invitation.save();

        res.status(200).json(invitation);

        const newInvitation = await Invitation.find({ sender, receiver });

        const InvitationId = newInvitation.map((item) => item._id);

        const receiverUser = await userModel.findByIdAndUpdate(receiver, {
            $push: { invitations: InvitationId },
        });
        console.log(receiverUser);

        const senderUser = await userModel.findByIdAndUpdate(sender, {
            $push: { invitations: InvitationId },
        });
        console.log(senderUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    addInvitation,
};
