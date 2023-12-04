const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
        },
        firstname: {
            type: String,
            // required: true,
        },
        lastname: {
            type: String,
            // required: true,
        },
        password: {
            type: String,
            required: true,
            minlenght: 6,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        socketId: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        invitations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Invitation",
            },
        ],
        isconnect: { type: Boolean, default: false },
    },
    { timestamp: true }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
