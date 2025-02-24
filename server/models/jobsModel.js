const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const JobSkills = require("./jobSkillsModel");
const Company = require('./companiesModel');
const Application = require('./applicationsModel')

// Define the JobCategory model for your "job_categories" table
const JobCategory = sequelize.define('JobCategory', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
}, {
    tableName: 'job_categories',
    timestamps: false
});

// Update the Job model: change "category" from STRING to INTEGER and set up the foreign key
const Job = sequelize.define('Job', {
    company_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT 
    },
    // Updated "category" field to use your already created column (int4)
    category: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
              model: JobCategory,
              key: 'id'
         }
    },
    location: { 
        type: DataTypes.STRING 
    },
    is_remote: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    },
    is_featured: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    createdAt: { 
        type: DataTypes.DATE, 
        field: 'created_at' 
    },
    updatedAt: { 
        type: DataTypes.DATE, 
        field: 'updated_at' 
    }
}, {
    tableName: 'jobs',
    timestamps: true
});


// Company <---> Job
Company.hasMany(Job, { foreignKey: 'company_id' });
Job.belongsTo(Company, { foreignKey: 'company_id', as: "company" });

// JobCategory <---> Job using the "category" column in jobs
Job.belongsTo(JobCategory, { foreignKey: 'category' });
JobCategory.hasMany(Job, { foreignKey: 'category' });

Job.hasMany(JobSkills, { foreignKey: "job_id", as: "JobSkills" });
JobSkills.belongsTo(Job, { foreignKey: "job_id" });

Job.hasMany(Application, { foreignKey: "job_id", as: "applications" });
Application.belongsTo(Job, { foreignKey: "job_id", as: "job" });

module.exports = { Job, JobCategory };
