const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Connection = sequelize.define('Connection', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    connected_user_id: { type: DataTypes.INTEGER, allowNull: false },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['pending', 'accepted', 'declined']], // Simula un ENUM
        },
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
}, {
    tableName: 'connections',
    timestamps: true,
});

module.exports = Connection;