const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const Application = sequelize.define(
    "Application",
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
        applicant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        cover_letter: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        resume_url: {
            type: DataTypes.STRING,
            allowNull: true, // If the applicant uploads a resume
        },
        applied_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "applications",
        timestamps: false,
    }
);

// ✅ Define User Association (Keep this here)
Application.belongsTo(User, { foreignKey: "applicant_id", as: "applicant" });

module.exports = Application; // Export without importing Job
