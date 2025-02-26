const User = require('../models/userModel');
const Follow = require('../models/followsModel');
const { createNotification, sendNotification } = require('./notificationsController');


exports.getFollowers = async (req, res) => {
    try {
        const { userId } = req.params;

        const followers = await Follow.findAll({
            where: { followed_id: userId },
            include: [{ model: User, as: "follower", attributes: ["id", "full_name", "profile_picture"] }],
        });

        res.json({ followers });
    } catch (error) {
        console.error("Error fetching followers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getFollowing = async (req, res) => {
    try {
        const { userId } = req.params;

        const following = await Follow.findAll({
            where: { follower_id: userId },
            include: [{ model: User, as: "followed", attributes: ["id", "full_name", "profile_picture"] }],
        });

        res.json({ following });
    } catch (error) {
        console.error("Error fetching following list:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get follow status for multiple users
exports.getFollowStatuses = async (req, res) => {
    try {
        const { userId } = req.params;
        const { talentIds } = req.body; // Expect an array of talent IDs

        if (!Array.isArray(talentIds) || talentIds.length === 0) {
            return res.status(400).json({ error: "Invalid talent IDs" });
        }

        const follows = await Follow.findAll({
            where: { follower_id: userId, followed_id: talentIds },
            attributes: ["followed_id"],
        });

        const followStatuses = follows.map(f => f.followed_id);

        res.json({ followStatuses });
    } catch (error) {
        console.error("Error fetching follow statuses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getFollowersCount = async (req, res) => {
    try {
        const { userId } = req.params;

        // Count followers where the given user is being followed
        const totalFollowers = await Follow.count({
            where: { followed_id: userId },
        });

        res.json({ totalFollowers });
    } catch (error) {
        console.error("Error fetching followers count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.followUser = async (req, res) => {
    try {
        const { followedId } = req.body; // ID of the user to follow
        const followerId = req.user.id; // ID of the logged-in user

        if (followerId === followedId) {
            return res.status(400).json({ error: "You cannot follow yourself." });
        }

        // Check if the follow record already exists
        const existingFollow = await Follow.findOne({
            where: { follower_id: followerId, followed_id: followedId },
        });

        if (existingFollow) {
            return res.status(400).json({ error: "You are already following this user." });
        }

        // Create new follow record
        await Follow.create({ follower_id: followerId, followed_id: followedId });

        // ✅ Send Notification Internally
        await sendNotification({
            user_id: followedId, // The user being followed
            sender_id: followerId, // The one following
            type: "follow",
            message: "👤 You have a new follower!",
        });

        return res.json({ message: "Followed successfully!" });
    } catch (error) {
        console.error("Error following user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const { followedId } = req.body; // ID of the user to unfollow
        const followerId = req.user.id; // ID of the logged-in user

        // Delete follow record
        const deleted = await Follow.destroy({
            where: { follower_id: followerId, followed_id: followedId },
        });

        if (!deleted) {
            return res.status(404).json({ error: "You are not following this user." });
        }

        return res.json({ message: "Unfollowed successfully!" });
    } catch (error) {
        console.error("Error unfollowing user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.isFollowingUser = async (req, res) => {
    try {
        const { followedId } = req.params; // ID of the user to check
        const followerId = req.user.id; // ID of the logged-in user

        const followRecord = await Follow.findOne({
            where: { follower_id: followerId, followed_id: followedId },
        });

        return res.json({ isFollowing: !!followRecord });
    } catch (error) {
        console.error("Error checking follow status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

