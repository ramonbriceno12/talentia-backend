const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");
const Plan = require("./planModel");

const Subscription = sequelize.define(
  "Subscription",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: { type: DataTypes.STRING(50), allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    auto_renew: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, field: "updated_at" },
  },
  {
    tableName: "subscriptions",
    timestamps: true,
  }
);

// Define relationships
Subscription.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Subscription, { foreignKey: "user_id", as: "subscriptions" });

Subscription.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });
Plan.hasMany(Subscription, { foreignKey: "plan_id", as: "subscriptions" });

module.exports = Subscription;