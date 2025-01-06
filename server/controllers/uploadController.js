const User = require('../models/userModel');
const { Application } = require('../models/jobsModel');
const { uploadToS3 } = require('../middleware/upload');
const e = require('express');

const uploadApplication = async (req, res) => {
    try {
        // Check if the file is present
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload file to S3 or storage bucket
        const fileUrl = await uploadToS3(req.file, 'resume');  // Assume this returns a URL

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

module.exports = { uploadAvatar, uploadResume, uploadApplication };
