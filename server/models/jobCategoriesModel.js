const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobCategories = sequelize.define('JobCategories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'job_categories',
    timestamps: false
});

module.exports = JobCategories;
