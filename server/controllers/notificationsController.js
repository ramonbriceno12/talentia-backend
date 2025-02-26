const Notification = require("../models/notificationsModel");
const { io, onlineUsers } = require("../config/socketServer");

// ✅ Internal function (Use this when calling notifications from another function)
exports.sendNotification = async ({ user_id, sender_id, type, message }) => {
    try {
        console.log(`📢 Preparing to send notification to user ${user_id}`);
        console.log("🟡 Active Users before sending notification:", onlineUsers);

        const notification = await Notification.create({
            user_id,
            sender_id,
            type,
            message,
            is_read: false,
        });

        console.log(`✅ Notification saved:`, notification.toJSON());

        if (onlineUsers.has(String(user_id))) {
            const receiverSocketId = onlineUsers.get(String(user_id));
            console.log(`🚀 Sending real-time notification to user ${user_id} (Socket ID: ${receiverSocketId})`);

            io().to(receiverSocketId).emit("receiveNotification", {
                message,
                type,
                sender_id,
            });
        } else {
            console.log(`🔴 User ${user_id} is NOT online - No real-time notification sent.`);
        }

        return notification;
    } catch (error) {
        console.error("❌ Error sending notification:", error);
    }
};
// ✅ API Route: Create Notification
exports.createNotification = async (req, res) => {
    try {
        const { user_id, sender_id, type, message } = req.body; // Ensure API request provides correct data
        if (!user_id || !sender_id || !type || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const notification = await exports.sendNotification({ user_id, sender_id, type, message });

        res.status(201).json({ message: "Notification created", notification });
    } catch (error) {
        console.error("❌ Error creating notification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ API Route: Get user notifications
exports.getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        const notifications = await Notification.findAll({
            where: { user_id: userId },
            order: [["createdAt", "DESC"]],
        });

        res.json({ notifications });
    } catch (error) {
        console.error("❌ Error fetching notifications:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
