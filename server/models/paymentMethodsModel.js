const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PaymentMethod = sequelize.define(
  "PaymentMethod",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, field: "updated_at" },
  },
  {
    tableName: "payment_methods",
    timestamps: true,
  }
);

module.exports = PaymentMethod;