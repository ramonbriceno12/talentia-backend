const express = require("express");
const router = express.Router();
const { createNotification, getUserNotifications } = require("../controllers/notificationsController");

router.post("/", createNotification); // Create a notification
router.get("/:userId", getUserNotifications); // Get all notifications for a user

module.exports = router;
