const Notification = require("./models/notification");

module.exports = {
    setNotification: async (req, res) => {
        const { userId, message } = req.body;

        try {
            const newNotification = new Notification({
                userId,
                message,
            });

            await newNotification.save();

            res.status(201).json(notification);
        } catch (err) {
            console.error(error);
        }
    },
};
