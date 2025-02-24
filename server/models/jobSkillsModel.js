const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Skill = require("./skillsModel");

const JobSkills = sequelize.define(
  "JobSkills",
  {
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "jobs",
        key: "id",
      },
    },
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "skills",
        key: "id",
      },
    },
  },
  { tableName: "job_skills", timestamps: false }
);

// ✅ Do NOT import Job here (fix circular dependency)
JobSkills.belongsTo(Skill, { foreignKey: "skill_id", as: "skills" });

module.exports = JobSkills;
