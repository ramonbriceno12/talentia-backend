const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'skills',
    timestamps: false
});

module.exports = Skill;
