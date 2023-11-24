const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
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
        role: {
            type: String,
            default: "user",
        },
        invitations: [
            {
                invitedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamp: true }
);
module.exports = mongoose.model("User", userSchema);
