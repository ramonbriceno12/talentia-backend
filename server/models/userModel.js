const { DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = require('../config/database');

const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    full_name: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    profile_picture: { type: DataTypes.STRING },
    resume_file: { type: DataTypes.STRING },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
}, {
    tableName: 'users',
    timestamps: true
});


module.exports = User;
