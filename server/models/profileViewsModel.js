const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const ProfileViews = sequelize.define(
    "ProfileViews",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        talent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        viewer_id: {
            type: DataTypes.INTEGER,
            allowNull: true, // Can be null if viewer is not logged in
            references: {
                model: "users",
                key: "id",
            },
        },
        ip_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        viewed_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "profile_views",
        timestamps: false,
    }
);

// ✅ Define Associations
ProfileViews.belongsTo(User, { foreignKey: "viewer_id", as: "viewer" });
ProfileViews.belongsTo(User, { foreignKey: "talent_id", as: "talent" });

module.exports = ProfileViews;
