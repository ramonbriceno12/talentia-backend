const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Follow = sequelize.define('Follow', {
    follower_id: { type: DataTypes.INTEGER, allowNull: false },
    followed_id: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
}, {
    tableName: 'follows',
    timestamps: true,
});

module.exports = Follow;