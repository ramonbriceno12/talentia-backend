const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Links = sequelize.define(
  "Links",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "links",
    timestamps: false,
  }
);

module.exports = Links;
