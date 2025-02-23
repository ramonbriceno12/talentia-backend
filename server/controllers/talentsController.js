const User = require('../models/userModel');
const JobTitle = require('../models/jobTitles');
const Skills = require('../models/skillsModel');
const { Op, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const UserSkills = require("../models/userSkills");
const Resume = require("../models/resumesModel");
const { uploadToS3, deleteFromS3 } = require('../middleware/upload');

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
                "id", "full_name", "email", "bio", "profile_picture",
                "is_featured", "createdAt", "updatedAt", "country", "years_of_experience", "expected_salary", "job_type_preference", "headline"
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
                },
                {
                    model: Resume,
                    attributes: ["id", "resume_url", "created_at"],
                    as: "resumes",
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
                "is_featured", "createdAt", "years_of_experience",
                "expected_salary", "job_type_preference", "headline"
            ],
            include: [
                {
                    model: JobTitle,
                    as: "job_title",
                    attributes: ["title"]
                },
                {
                    model: Resume,  // ✅ Include resumes
                    as: "resumes",
                    attributes: ["id", "resume_url", "created_at"]
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

exports.uploadResume = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!req.file) return res.status(400).json({ message: "No file uploaded." });

        // ✅ Upload to S3
        const resumeUrl = await uploadToS3(req.file, "talentiafilesprod/resumes");

        // ✅ Save in Database
        const newResume = await Resume.create({
            user_id: userId,
            resume_url: resumeUrl,
        });

        res.status(201).json(newResume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading resume." });
    }
};

exports.deleteResume = async (req, res) => {
    try {
        const { id, resumeId } = req.params;

        // ✅ Find Resume in DB
        const resume = await Resume.findOne({ where: { id: resumeId, user_id: id } });
        if (!resume) return res.status(404).json({ message: "Resume not found." });

        // ✅ Delete from S3
        await deleteFromS3(resume.resume_url);

        // ✅ Remove from Database
        await Resume.destroy({ where: { id: resumeId } });

        res.json({ message: "Resume deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting resume." });
    }
};

exports.updateExperience = async (req, res) => {
    try {
        const { years_of_experience, expected_salary, job_type_preference } = req.body;
        const { id } = req.params;

        const talent = await User.findByPk(id);
        if (!talent) {
            return res.status(404).json({ message: "Talent not found." });
        }

        // ✅ Validate input
        if (
            (years_of_experience !== undefined && (isNaN(years_of_experience) || years_of_experience < 0)) ||
            (expected_salary !== undefined && (isNaN(expected_salary) || expected_salary < 0))
        ) {
            return res.status(400).json({ message: "Years of experience and expected salary must be non-negative numbers." });
        }

        if (job_type_preference !== undefined && typeof job_type_preference !== "string") {
            return res.status(400).json({ message: "Job type preference must be a string." });
        }

        // ✅ Find the talent by ID
        

        // ✅ Update the fields if provided
        const updatedFields = {};
        if (years_of_experience !== undefined) updatedFields.years_of_experience = years_of_experience;
        if (expected_salary !== undefined) updatedFields.expected_salary = expected_salary;
        if (job_type_preference !== undefined) updatedFields.job_type_preference = job_type_preference;

        await talent.update(updatedFields);

        // ✅ Return updated talent
        return res.status(200).json({ message: "Experience & Salary updated successfully.", talent });

    } catch (error) {
        console.error("Error updating experience & salary:", error);
        return res.status(500).json({ message: "Error updating experience & salary. Please try again." });
    }
}

// Update a talent
exports.updateTalentProfile = async (req, res) => {
    try {
        const talent = await User.findByPk(req.params.id);
        if (!talent) {
            return res.status(404).json({ message: "Talent not found" });
        }

        const { full_name, email, headline, job_title_id } = req.body;

        let profile_picture = talent.profile_picture;
        if (req.file) {  // ✅ Correct check for single file uploads
            console.log('✅ File was uploaded:', req.file);

            if (profile_picture) {
                console.log('🗑 Deleting old profile picture...');
                await deleteFromS3(talent.profile_picture);
            }

            console.log('📤 Uploading new profile picture to S3...');
            profile_picture = await uploadToS3(req.file, "talentiafilesprod/avatars");
        }
        console.log(profile_picture)

        // ✅ Update Talent Profile
        await talent.update({
            full_name,
            email,
            headline,
            job_title_id,
            profile_picture,
        });

        res.json({ message: "Talent updated successfully", talent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating talent" });
    }
};

exports.updateBioTalent = async (req, res) => {
    try {
        const { bio } = req.body;
        const { id } = req.params;

        // ✅ Validate input
        if (!bio || bio.trim().length < 10) {
            return res.status(400).json({ message: "Bio must be at least 10 characters long." });
        }

        // ✅ Find the talent by ID
        const talent = await User.findByPk(id);
        if (!talent) {
            return res.status(404).json({ message: "Talent not found." });
        }

        // ✅ Update bio field only
        await talent.update({ bio });

        // ✅ Return updated talent
        return res.status(200).json({ message: "Bio updated successfully.", talent });

    } catch (error) {
        console.error("Error updating bio:", error);
        return res.status(500).json({ message: "Error updating bio. Please try again." });
    }
};

exports.updateTalentSkills = async (req, res) => {
    const { user_id, skills } = req.body; // `skills` is an array of skill IDs

    if (!Array.isArray(skills)) {
        return res.status(400).json({ message: "Skills must be an array of skill IDs." });
    }

    const transaction = await sequelize.transaction();

    try {
        // Delete all existing user skills
        await UserSkills.destroy({ where: { user_id }, transaction });

        // Insert new skills
        const newSkills = skills.map(skill_id => ({ user_id, skill_id }));
        await UserSkills.bulkCreate(newSkills, { transaction });

        await transaction.commit();

        return res.status(200).json({ message: "Skills updated successfully." });
    } catch (error) {
        await transaction.rollback();
        console.error("Error updating user skills:", error);
        return res.status(500).json({ message: "Error updating skills. Please try again." });
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
