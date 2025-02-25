const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");
const { Job } = require("./jobsModel");

const JobViews = sequelize.define(
    "JobViews",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        job_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "jobs",
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
        tableName: "job_views",
        timestamps: false,
    }
);

// ✅ Define Associations
JobViews.belongsTo(User, { foreignKey: "viewer_id", as: "viewer" });
JobViews.belongsTo(Job, { foreignKey: "job_id", as: "job" });

module.exports = JobViews;
