const ProfileViews = require("../models/profileViewsModel");
const User = require("../models/userModel");
const { Op } = require("sequelize");

exports.registerProfileView = async (req, res) => {
    try {
        const { talentId } = req.params;
        const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const viewerId = req.user ? req.user.id : null; // If logged in, store user ID

        // Check if talent exists
        const talent = await User.findByPk(talentId);
        if (!talent) return res.status(404).json({ message: "Talent not found" });

        // Check if this viewer (by IP or user ID) has already viewed this profile in the last 12 hours
        const existingView = await ProfileViews.findOne({
            where: {
                talent_id: talentId,
                [Op.or]: [
                    { ip_address: userIp },
                    viewerId ? { viewer_id: viewerId } : {}, // Prevents duplicate logging
                ],
                viewed_at: {
                    [Op.gte]: new Date(Date.now() - 12 * 60 * 60 * 1000), // Last 12 hours
                },
            },
        });

        if (!existingView) {
            await ProfileViews.create({
                talent_id: talentId,
                viewer_id: viewerId, // Stores the user ID if available
                ip_address: userIp,
            });
        }

        res.status(200).json({ message: "Profile view recorded" });
    } catch (error) {
        console.error("Error registering profile view:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getTalentProfileViews = async (req, res) => {
    try {
        const talentId = req.params.id;

        // Check if talent exists
        const talent = await User.findByPk(talentId);
        if (!talent) return res.status(404).json({ message: "Talent not found" });

        // Get total view count
        const viewCount = await ProfileViews.count({ where: { talent_id: talentId } });

        // Get the list of unique users who viewed the profile
        const viewers = await ProfileViews.findAll({
            where: { talent_id: talentId, viewer_id: { [Op.ne]: null } }, // Only logged-in users
            include: [
                {
                    model: User,
                    as: "viewer", // ✅ Must match the association alias
                    attributes: ["id", "full_name", "email", "profile_picture"],
                },
            ],
            order: [["viewed_at", "DESC"]],
        });

        // Ensure uniqueness
        const uniqueViewers = [];
        const seen = new Set();
        viewers.forEach((view) => {
            if (view.viewer && !seen.has(view.viewer.id)) {
                seen.add(view.viewer.id);
                uniqueViewers.push(view.viewer);
            }
        });

        res.status(200).json({ profileViews: viewCount, viewers: uniqueViewers });
    } catch (error) {
        console.error("Error fetching profile views:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
