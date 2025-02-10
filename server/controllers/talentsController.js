const User = require('../models/userModel');
const JobTitle = require('../models/jobTitles');
const Skills = require('../models/skillsModel');
const { Op } = require('sequelize');

// Get all talents with optional filtering
exports.getAllTalents = async (req, res) => {
    try {
        const { search, is_featured } = req.query;
        
        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { full_name: { [Op.iLike]: `%${search}%` } },
                { bio: { [Op.iLike]: `%${search}%` } },
            ];
        }

        whereClause.is_featured = "true";

        const talents = await User.findAll({
            where: whereClause,
            attributes: [
                "id", "full_name", "email", "bio", "profile_picture", "resume_file", 
                "is_featured", "createdAt", "updatedAt"
            ],
            include: [
                {
                    model: JobTitle,
                    attributes: ["title"], // Only get the job title name
                    as: "job_title" // Alias the association
                },
                {
                    model: Skills, // Include the Skills model
                    attributes: ["id", "name", "category"], // Select specific fields
                    as: "skills", // Alias for the association
                    through: { attributes: [] } // Exclude the join table (user_skills) fields
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json(talents);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching talents" });
    }
};

// Get talent by ID
exports.getTalentById = async (req, res) => {
    try {
        const talent = await User.findByPk(req.params.id, {
            attributes: ['id', 'full_name', 'email', 'bio', 'profile_picture', 'resume_file', 'is_featured', 'createdAt']
        });

        if (!talent) return res.status(404).json({ message: 'Talent not found' });

        res.json(talent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching talent' });
    }
};

// Create a new talent
exports.createTalent = async (req, res) => {
    const { email, password_hash, full_name, bio, profile_picture, resume_file, is_featured, plan_id } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newTalent = await User.create({
            email,
            password_hash,
            full_name,
            bio,
            profile_picture,
            resume_file,
            is_featured,
            role: 'talent',
            plan_id
        });

        res.status(201).json({ message: 'Talent created successfully', talent: newTalent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating talent' });
    }
};

// Update a talent
exports.updateTalent = async (req, res) => {
    const { full_name, bio, profile_picture, resume_file, is_featured } = req.body;

    try {
        const talent = await User.findByPk(req.params.id);

        if (!talent) {
            return res.status(404).json({ message: 'Talent not found' });
        }

        await talent.update({
            full_name,
            bio,
            profile_picture,
            resume_file,
            is_featured
        });

        res.json({ message: 'Talent updated successfully', talent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating talent' });
    }
};

// Delete a talent
exports.deleteTalent = async (req, res) => {
    try {
        const talent = await User.findByPk(req.params.id);

        if (!talent) {
            return res.status(404).json({ message: 'Talent not found' });
        }

        await talent.destroy();
        res.json({ message: 'Talent deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting talent' });
    }
};
