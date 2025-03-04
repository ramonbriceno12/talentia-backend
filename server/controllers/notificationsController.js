const Notification = require("../models/notificationsModel");
const { io, onlineUsers } = require("../config/socketServer");

// ✅ Internal function (Use this when calling notifications from another function)
exports.sendNotification = async ({ user_id, sender_id, type, message }) => {
    try {

        const notification = await Notification.create({
            user_id,
            sender_id,
            type,
            message,
            is_read: false,
        });


        if (onlineUsers.has(String(user_id))) {
            const receiverSocketId = onlineUsers.get(String(user_id));

            io().to(receiverSocketId).emit("receiveNotification", {
                id: notification.id,
                message,
                type,
                sender_id,
                is_read: false,
                createdAt: notification.createdAt,
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
        const { user_id, sender_id, type, message } = req.body;
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
        const userId = req.user.id;

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

// ✅ API Route: Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you're using authentication middleware to get `req.user`

        await Notification.update(
            { is_read: true },
            { where: { user_id: userId, is_read: false } }
        );

        res.json({ message: "All notifications marked as read" });

        // 🔹 Notify the frontend via WebSocket
        if (onlineUsers.has(String(userId))) {
            const receiverSocketId = onlineUsers.get(String(userId));
            io().to(receiverSocketId).emit("notificationsUpdated");
        }
    } catch (error) {
        console.error("❌ Error marking notifications as read:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ API Route: Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByPk(notificationId);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }

        await notification.destroy();
        res.json({ message: "Notification deleted successfully" });

        // 🔹 Notify the frontend via WebSocket
        if (onlineUsers.has(String(notification.user_id))) {
            const receiverSocketId = onlineUsers.get(String(notification.user_id));
            io().to(receiverSocketId).emit("notificationsUpdated");
        }
    } catch (error) {
        console.error("❌ Error deleting notification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
