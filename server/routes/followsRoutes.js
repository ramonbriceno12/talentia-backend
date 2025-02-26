const express = require("express");
const router = express.Router();
const { followUser, unfollowUser, isFollowingUser, getFollowers, getFollowing, getFollowStatuses, getFollowersCount } = require("../controllers/followsController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/follow", followUser); // Follow a user
router.post("/unfollow", authMiddleware, unfollowUser); // Unfollow a user
router.get("/following/:userId", getFollowing); // Get users a user follows
router.get("/followers/:userId", getFollowers); // Get followers of a user
router.get("/count/:userId", authMiddleware, getFollowersCount);
router.get("/is-following/:followedId", authMiddleware, isFollowingUser); // Check if following
router.post("/statuses/:userId", authMiddleware, getFollowStatuses);

module.exports = router;
