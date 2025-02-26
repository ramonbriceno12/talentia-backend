const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");
const PaymentMethod = require("./paymentMethodsModel");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false },
    status: { type: DataTypes.STRING(50), allowNull: false },
    transaction_id: { type: DataTypes.STRING(255), allowNull: true },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, field: "updated_at" },
  },
  {
    tableName: "payments",
    timestamps: true,
  }
);

// Define relationships
Payment.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Payment, { foreignKey: "user_id", as: "payments" });

Payment.belongsTo(PaymentMethod, { foreignKey: "payment_method_id", as: "payment_method" });
PaymentMethod.hasMany(Payment, { foreignKey: "payment_method_id", as: "payments" });

module.exports = Payment;