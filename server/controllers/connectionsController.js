const User = require('../models/userModel');
const Connection = require('../models/connectionsModel');
const JobTitle = require('../models/jobTitles');
const { Op } = require("sequelize");

exports.getConnectionsByTalent = async (req, res) => {


    try {
        const id = req.params.id;

        const talent = await User.findByPk(id);

        if (!talent) return res.status(400).json({ message: "Talent not found" });

        const connections = await Connection.findAll({
            where: { user_id: id },
            include: [
                {
                    model: User,
                    as: 'connectedUser', // This is defined in your User model relationships
                    attributes: ['id', 'full_name', 'profile_picture', 'job_title_id', 'status_badge'],
                    include: [
                        {
                            model: JobTitle,
                            as: 'job_title', // Including job title details
                            attributes: ['title']
                        }
                    ]
                }
            ]
        });

        return res.status(200).json({ connections });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }

}

exports.sendConnectionRequest = async (req, res) => {
    try {
        const { userId, targetId } = req.body;

        if (userId === targetId) {
            return res.status(400).json({ message: "You cannot connect with yourself." });
        }

        // Check if connection already exists
        const existingConnection = await Connection.findOne({
            where: {
                [Op.or]: [
                    { user_id: userId, connected_user_id: targetId },
                    { user_id: targetId, connected_user_id: userId },
                ],
            },
        });

        if (existingConnection) {
            return res.status(400).json({ message: "Connection request already exists." });
        }

        // Create a new connection request
        const newConnection = await Connection.create({
            user_id: userId,
            connected_user_id: targetId,
            status: "pending",
        });

        res.status(201).json({ message: "Connection request sent", connection: newConnection });
    } catch (error) {
        console.error("Error sending connection request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Check if a user is already connected (for button display)
exports.getConnectionStatus = async (req, res) => {
    try {
        const { userId, targetId } = req.params;

        const connection = await Connection.findOne({
            where: {
                [Op.or]: [
                    { user_id: userId, connected_user_id: targetId },
                    { user_id: targetId, connected_user_id: userId },
                ],
            },
        });

        if (!connection) {
            return res.json({ status: "none" }); // No connection exists
        }

        res.json({ status: connection.status });
    } catch (error) {
        console.error("Error fetching connection status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getConnectionStatuses = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10); 
        const talentIds = req.body.talentIds.map(id => parseInt(id, 10)); // Convert all to integers

        if (!Array.isArray(talentIds) || talentIds.length === 0) {
            return res.status(400).json({ message: "Invalid talent IDs" });
        }

        console.log("🔹 User ID:", userId);
        console.log("🔹 Talent IDs:", talentIds);

        // 🔥 UPDATED QUERY: Ensure both user_id and connected_user_id are explicitly checked
        const connections = await Connection.findAll({
            where: {
                [Op.or]: [
                    { user_id: userId, connected_user_id: { [Op.in]: talentIds } },
                    { connected_user_id: userId, user_id: { [Op.in]: talentIds } }
                ]
            }
        });

        console.log("🔹 Found connections:", connections.map(conn => ({
            user_id: conn.user_id,
            connected_user_id: conn.connected_user_id,
            status: conn.status
        })));

        // ✅ Map statuses correctly
        const statusMap = {};
        talentIds.forEach((talentId) => {
            const connection = connections.find(
                (conn) =>
                    (conn.user_id === userId && conn.connected_user_id === talentId) ||
                    (conn.connected_user_id === userId && conn.user_id === talentId)
            );

            statusMap[talentId] = connection ? connection.status : "none"; // ✅ Ensure status is returned correctly
        });

        console.log("🔹 Final Status Map:", statusMap);

        res.json({ connectionStatuses: statusMap });
    } catch (error) {
        console.error("Error fetching connection statuses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// ✅ API Route: Count User's Connections
exports.getConnectionsCount = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from request parameters

        // Count connections where the user is either `user_id` or `connected_user_id`
        const totalConnections = await Connection.count({
            where: {
                status: "accepted",
                [Op.or]: [{ user_id: userId }, { connected_user_id: userId }],
            },
        });

        res.json({ totalConnections });
    } catch (error) {
        console.error("Error fetching connections count:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// ✅ Accept a Connection Request
exports.acceptConnection = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await Connection.findByPk(id);
        if (!connection) return res.status(404).json({ message: "Connection not found" });

        if (connection.status !== "pending") {
            return res.status(400).json({ message: "Connection is already processed" });
        }

        connection.status = "accepted";
        await connection.save();

        res.status(200).json({ message: "Connection accepted", connection });
    } catch (error) {
        console.error("Error accepting connection:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Decline a Connection Request
exports.declineConnection = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await Connection.findByPk(id);
        if (!connection) return res.status(404).json({ message: "Connection not found" });

        if (connection.status !== "pending") {
            return res.status(400).json({ message: "Connection is already processed" });
        }

        connection.status = "declined";
        await connection.save();

        res.status(200).json({ message: "Connection declined", connection });
    } catch (error) {
        console.error("Error declining connection:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getMutualConnections = async (req, res) => {
    try {
        const { userId, targetId } = req.params;

        // Get all accepted connections for both users
        const userConnections = await Connection.findAll({
            where: {
                [Op.or]: [{ user_id: userId }, { connected_user_id: userId }],
                status: "accepted",
            },
        });

        const targetConnections = await Connection.findAll({
            where: {
                [Op.or]: [{ user_id: targetId }, { connected_user_id: targetId }],
                status: "accepted",
            },
        });

        // Extract user IDs from connections
        const userIds = userConnections.map(conn =>
            conn.user_id === parseInt(userId) ? conn.connected_user_id : conn.user_id
        );

        const targetIds = targetConnections.map(conn =>
            conn.user_id === parseInt(targetId) ? conn.connected_user_id : conn.user_id
        );

        // Find mutual connections (intersection of both lists)
        const mutualConnectionIds = userIds.filter(id => targetIds.includes(id));

        // Fetch mutual user details
        const mutualConnections = await User.findAll({
            where: { id: mutualConnectionIds },
            include: [{
                model: JobTitle, 
                as: "job_title",
                attributes: ["title"]
            }],
            attributes: ["id", "full_name", "profile_picture"],
        });

        res.json({ mutualConnections });
    } catch (error) {
        console.error("Error fetching mutual connections:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

