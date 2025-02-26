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

exports.acceptConnection = async (req, res) => {
    try {
        const { id } = req.params; // Connection ID

        const connection = await Connection.findByPk(id);
        if (!connection) return res.status(404).json({ message: "Connection not found" });

        if (connection.status !== "pending") {
            return res.status(400).json({ message: "Connection is already processed" });
        }

        connection.status = "accepted";
        await connection.save();

        return res.status(200).json({ message: "Connection accepted", connection });
    } catch (error) {
        console.error("Error accepting connection:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.declineConnection = async (req, res) => {
    try {
        const { id } = req.params; // Connection ID

        const connection = await Connection.findByPk(id);
        if (!connection) return res.status(404).json({ message: "Connection not found" });

        if (connection.status !== "pending") {
            return res.status(400).json({ message: "Connection is already processed" });
        }

        connection.status = "declined";
        await connection.save();

        return res.status(200).json({ message: "Connection declined", connection });
    } catch (error) {
        console.error("Error declining connection:", error);
        return res.status(500).json({ message: "Server error" });
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

