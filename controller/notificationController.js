const { response } = require("express");
const Notification = require("../model/notificationModel");

const getNotifications = async (userId) => {
    // const { userId } = req.params;

    try {
        const notifications = await Notification.find({ userId })
            .populate("senderId", "username")
            .populate("userId", "username");

        return notifications;
    } catch (err) {
        return err;
    }
};

module.exports = {
    getNotifications,
};
