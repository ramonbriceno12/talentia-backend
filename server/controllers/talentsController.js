const User = require('../models/userModel');
const JobTitle = require('../models/jobTitles');
const Skills = require('../models/skillsModel');
const { Op, Sequelize } = require('sequelize');
const UserSkills = require("../models/userSkills");

// Get all talents with optional filtering
exports.getAllTalents = async (req, res) => {
    try {
        const { search, job_title, min_salary, max_salary } = req.query;

        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { full_name: { [Op.iLike]: `%${search}%` } },
                { bio: { [Op.iLike]: `%${search}%` } },
            ];
        }

        if (min_salary || max_salary) {
            whereClause.expected_salary = {};
            if (min_salary) whereClause.expected_salary[Op.gte] = parseFloat(min_salary);
            if (max_salary) whereClause.expected_salary[Op.lte] = parseFloat(max_salary);
        }

        whereClause.is_featured = true;

        const talents = await User.findAll({
            where: whereClause,
            attributes: [
                "id", "full_name", "email", "bio", "profile_picture", "resume_file",
                "is_featured", "createdAt", "updatedAt", "country", "years_of_experience", "expected_salary", "job_type_preference",
                [
                    Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM user_skills
                        WHERE user_skills.user_id = "User".id
                    )`),
                    "skill_count"
                ] // Subquery to count skills
            ],
            include: [
                {
                    model: JobTitle,
                    attributes: ["title"],
                    as: "job_title",
                    ...(job_title ? { where: { title: { [Op.iLike]: `%${job_title}%` } } } : {})
                },
                {
                    model: Skills,
                    attributes: ["id", "name", "category"],
                    as: "skills",
                    through: { attributes: [] }
                }
            ],
            order: [[Sequelize.literal("skill_count"), "DESC"], ["createdAt", "DESC"]]
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
        // Fetch user with job title
        const talent = await User.findByPk(req.params.id, {
            attributes: [
                "id", "full_name", "email", "bio", "profile_picture",
                "resume_file", "is_featured", "createdAt", "years_of_experience", "expected_salary", "job_type_preference"
            ],
            include: [
                {
                    model: JobTitle,
                    as: "job_title",
                    attributes: ["title"]
                }
            ]
        });

        if (!talent) return res.status(404).json({ message: "Talent not found" });

        // Fetch skills from UserSkills table
        const userSkills = await UserSkills.findAll({
            where: { user_id: talent.id }, // Match user_id
            attributes: ["skill_id"]
        });

        // Extract skill IDs
        const skillIds = userSkills.map(us => us.skill_id);

        // Fetch skills based on extracted IDs
        const skills = await Skills.findAll({
            where: { id: skillIds },
            attributes: ["id", "name", "category"]
        });

        // Attach skills to talent object
        res.json({
            ...talent.toJSON(),
            skills // Append skills manually
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching talent" });
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
