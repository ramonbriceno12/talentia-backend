const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const Notification = sequelize.define("Notification", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false }, // The recipient
    sender_id: { type: DataTypes.INTEGER, allowNull: true }, // Optional sender
    type: { type: DataTypes.STRING, allowNull: false }, // e.g., "follow", "message", "job_invite"
    message: { type: DataTypes.STRING, allowNull: false }, // Notification text
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false }, // Track unread
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at' 
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at' 
    },
}, {
    tableName: "notifications",
    timestamps: true,
});

Notification.belongsTo(User, { foreignKey: "user_id", as: "recipient" });
Notification.belongsTo(User, { foreignKey: "sender_id", as: "sender" });

module.exports = Notification;
