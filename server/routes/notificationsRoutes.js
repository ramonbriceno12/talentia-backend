const express = require("express");
const router = express.Router();
const { createNotification, getUserNotifications, markAllAsRead, deleteNotification } = require("../controllers/notificationsController");
const authenticateJWT = require("../middleware/authMiddleware");

router.post("/", createNotification); // Create a notification
router.get("/:userId", authenticateJWT, getUserNotifications); // Get all notifications for a user
router.post('/mark-all', authenticateJWT, markAllAsRead); // Mark all notifications as read
router.delete('/:notificationId', authenticateJWT, deleteNotification); // Mark a single notification as read

module.exports = router;
