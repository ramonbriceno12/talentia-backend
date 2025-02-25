const User = require("./userModel");
const Skills = require("./skillsModel");
const UserSkills = require("./userSkills");
const UserLinks = require("./userLinksModel");

// ✅ Define many-to-many relationship in a separate file
User.belongsToMany(Skills, {
  through: UserSkills,
  foreignKey: "user_id",
  otherKey: "skill_id",
  as: "skills",
});

Skills.belongsToMany(User, {
  through: UserSkills,
  foreignKey: "skill_id",
  otherKey: "user_id",
  as: "users",
});

User.hasMany(UserLinks, {
  foreignKey: "user_id",
  as: "links", // ✅ This alias must match the include in queries
});

UserLinks.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = { User, Skills, UserSkills, UserLinks };
