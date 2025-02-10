const User = require('../models/userModel');
const { Application } = require('../models/jobsModel');
const Company = require('../models/companiesModel');
const JobTitle = require('../models/jobTitles');
const { uploadToS3 } = require('../middleware/upload');
const e = require('express');
const { sendCompanyEmail, sendTalentEmail } = require('../utils/sendEmails');

const uploadApplication = async (req, res) => {
    try {
        // Check if the file is present
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload file to S3 or storage bucket
        const fileUrl = await uploadToS3(req.file, 'application');  // Assume this returns a URL

        const existingUser = await User.findOne({ where: { email: req.body.email } });

        let userId = null;

        if(existingUser){
            userId = existingUser.id;
        }else{
            const user = await User.create({
                email: req.body.email,
                full_name: req.body.name,
                role: 'talent',
            });
            userId = user.id;
        }

        // Create the application in the database
        const application = await Application.create({
            job_id: req.body.job_id,
            user_id: userId,
            resume_file: fileUrl,
            application_text: req.body.coverLetter,
        });

        // Return response with user ID and application ID
        res.status(200).json({ 
            message: 'Application uploaded successfully',
            user_id: user.id,
            application_id: application.id,
        });

    } catch (error) {
        console.error('Error uploading application:', error);
        res.status(500).json({ message: 'Error uploading application', error });
    }
};



const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileUrl = await uploadToS3(req.file, 'avatars');
        await User.update(
            { profile_picture: fileUrl },
            { where: { id: req.body.user_id } }
        );

        res.status(200).json({ fileUrl });
    } catch (error) {
        console.error('Upload error:', error);  // Log full error to console
        res.status(500).json({
            message: 'Error uploading avatar',
            error: error.message || 'Unknown error',
        });
    }
};


const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileUrl = await uploadToS3(req.file, 'resumes');

        await User.update(
            { resume_file: fileUrl },
            { where: { id: req.body.user_id } }
        );

        res.status(200).json({ fileUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading resume', error });
    }
};


const uploadTalent = async (req, res) => {
    try {
        // Ensure files are uploaded
        if (!req.files || (!req.files.resume && !req.files.avatar)) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Upload files to S3
        let resumeUrl = req.files.resume ? await uploadToS3(req.files.resume[0], "talentiafilesprod/resumes") : null;
        let avatarUrl = req.files.avatar ? await uploadToS3(req.files.avatar[0], "talentiafilesprod/avatars") : null;

        const existingUser = await User.findOne({ where: { email: req.body.email } });
        const jobTitle = await JobTitle.findOne({ where: { title: req.body.job_title } });

        let user = null;

        if (existingUser) {
            user = existingUser;
            await User.update(
                {
                    resume_file: resumeUrl || user.resume_file, // Only update if new file is uploaded
                    profile_picture: avatarUrl || user.profile_picture,
                    job_title_id: jobTitle.id,
                },
                { where: { id: user.id } }
            );
        } else {
            user = await User.create({
                email: req.body.email,
                full_name: req.body.name,
                role: "talent",
                resume_file: resumeUrl,
                profile_picture: avatarUrl,
                plan_id: req.body.plan_id,
                job_title_id: jobTitle.id,
            });
        }

        // Return response with user ID
        res.status(200).json({
            message: "Talent uploaded successfully",
            user_id: user.id,
        });

        sendTalentEmail(user.email, "¡Tu registro en Talentia está completo! 🚀", user.full_name);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading talent", error });
    }
};


const uploadCompany = async (req, res) => {
    try {
        // Check if the file is present
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload file to S3 or storage bucket
        const fileUrl = await uploadToS3(req.file, 'talentiafilesprod/companies');  // Assume this returns a URL

        const existingCompany = await Company.findOne({ where: { email: req.body.email } });

        let company = null;

        if(existingCompany){
            company = existingCompany;
            await Company.update(
                { requirements_file: fileUrl },
                { where: { id: company.id } }
            );
        }else{
            company = await Company.create({
                email: req.body.email,
                name: req.body.name,
                requirements_file: fileUrl,
                address: req.body.address,
            });
        }

        // Return response with user ID and application ID
        res.status(200).json({ 
            message: 'Company uploaded successfully',
            company_id: company.id,
        });

        sendCompanyEmail(company.email, '¡Tu solicitud como empresa ha sido recibida en Talentia!', company.name);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error uploading company', error });
    }
}

module.exports = { uploadAvatar, uploadResume, uploadApplication, uploadTalent, uploadCompany };
