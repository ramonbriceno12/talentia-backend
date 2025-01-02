const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
    company_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    is_remote: { type: DataTypes.BOOLEAN, defaultValue: true },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
}, {
    tableName: 'jobs',
    timestamps: true
});

const Company = sequelize.define('Company', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    logo: { type: DataTypes.STRING },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
}, {
    tableName: 'companies',
    timestamps: true
});

const Application = sequelize.define('Application', {
    job_id: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER },
    application_text: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.DATE, field: 'created_at' }
}, {
    tableName: 'applications',
    timestamps: false
});

// Define associations
Job.hasMany(Application, { foreignKey: 'job_id' });
Application.belongsTo(Job, { foreignKey: 'job_id' });

// Fix: Establish the correct association between Company and Job
Company.hasMany(Job, { foreignKey: 'company_id' });
Job.belongsTo(Company, { foreignKey: 'company_id' });

module.exports = { Job, Application, Company };
