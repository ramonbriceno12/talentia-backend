const Application = require("../models/applicationsModel");
const { Job } = require("../models/jobsModel");
const Company = require("../models/companiesModel");
const { sendTalentAppliedEmail, sendCompanyApplicationEmail, sendAdminApplicationEmail } = require("../utils/sendEmails");
const User = require("../models/userModel");


// ✅ Create a new application
exports.createApplication = async (req, res) => {
    try {
        const { job_id, applicant_id, resume_url, cover_letter } = req.body;

        // Validate required fields
        if (!job_id || !applicant_id || !resume_url) {
            return res.status(400).json({ message: "job_id, applicant_id, and resume_url are required fields." });
        }

        // Check if the job exists
        const job = await Job.findByPk(job_id);
        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }

        const talent = await User.findByPk(applicant_id);

        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({
            where: { job_id, applicant_id },
        });

        if (existingApplication) {
            return res.status(401).json({ message: "You have already applied for this job." });
        }

        // Create the application
        const newApplication = await Application.create({
            job_id,
            applicant_id,
            resume_url,
            cover_letter: cover_letter || null, // Cover letter is optional
            applied_at: new Date(), // Set the current timestamp
        });

        // Fetch job and company details for the response
        const jobDetails = await Job.findByPk(job_id, {
            include: [
                {
                    model: Company,
                    as: "company",
                    attributes: ["name", "email"],
                },
            ],
            attributes: ["id", "title", "location", "is_remote"],
        });

        // Format the response
        const response = {
            application_id: newApplication.id,
            job_id: jobDetails.id,
            job_title: jobDetails.title,
            company: jobDetails.company?.name || "Unknown Company",
            location: jobDetails.is_remote ? "Remoto" : jobDetails.location || "No location",
            applied_at: newApplication.applied_at,
            resume_url: newApplication.resume_url,
            cover_letter: newApplication.cover_letter,
        };

        // Send response to the frontend immediately
        res.status(201).json({ message: "Application submitted successfully.", application: response });

        // Send emails in the background (without waiting for them to complete)
        sendTalentAppliedEmail(talent.email, talent.full_name, jobDetails.title, jobDetails.company?.name || "Unknown Company")
            .catch((error) => console.error("Error sending talent email:", error));

        sendCompanyApplicationEmail(jobDetails.company?.email, jobDetails.company?.name || "Unknown Company", jobDetails.title, talent.full_name, talent.email)
            .catch((error) => console.error("Error sending company email:", error));

        sendAdminApplicationEmail(talent.full_name, jobDetails.title, jobDetails.company?.name || "Unknown Company")
            .catch((error) => console.error("Error sending admin email:", error));

    } catch (error) {
        console.error("Error creating application:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTalentApplications = async (req, res) => {
    try {
        const id = req.params.id;

        const applications = await Application.findAll({
            where: { applicant_id: id },
            include: [
                {
                    model: Job,
                    as: "job",
                    attributes: ["id", "title", "location", "is_remote"],
                    include: [
                        {
                            model: Company,
                            as: "company",
                            attributes: ["name"],
                        },
                    ],
                },
            ],
            attributes: ["applied_at"],
            order: [["applied_at", "DESC"]],
        });

        // Format response
        const formattedApplications = applications.map((app) => ({
            job_id: app.job?.id || null,
            job_title: app.job?.title || "Unknown Job",
            company: app.job?.company?.name || "Unknown Company",
            location: app.job?.is_remote ? "Remoto" : app.job?.location || "No location",
            applied_at: app.applied_at,
        }));

        res.json({ applications: formattedApplications });
    } catch (error) {
        console.error("Error fetching job applications:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTalentApplicationsDashboard = async (req, res) => {
    try {
        const id = req.params.id;

        // Fetch the last 10 applications for the dashboard
        const latestApplications = await Application.findAll({
            where: { applicant_id: id },
            include: [
                {
                    model: Job,
                    as: "job",
                    attributes: ["id", "title", "location", "is_remote"],
                    include: [
                        {
                            model: Company,
                            as: "company",
                            attributes: ["name"],
                        },
                    ],
                },
            ],
            attributes: ["applied_at"],
            order: [["applied_at", "DESC"]],
            limit: 10, // ✅ Get only 10 latest applications
        });

        // Fetch total applications count
        const applicationCount = await Application.count({
            where: { applicant_id: id },
        });

        // Format response
        const formattedApplications = latestApplications.map((app) => ({
            job_id: app.job?.id || null,
            job_title: app.job?.title || "Unknown Job",
            company: app.job?.company?.name || "Unknown Company",
            location: app.job?.is_remote ? "Remoto" : app.job?.location || "No location",
            applied_at: app.applied_at,
        }));

        res.json({ applications: formattedApplications, totalApplications: applicationCount });
    } catch (error) {
        console.error("Error fetching job applications for dashboard:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.checkUserApplication = async (req, res) => {
    try {
        const { job_id, applicant_id } = req.query;

        // Validate required fields
        if (!job_id || !applicant_id) {
            return res.status(400).json({ message: "job_id and applicant_id are required fields." });
        }

        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({
            where: { job_id, applicant_id },
            include: [
                {
                    model: Job,
                    as: "job",
                    attributes: ["id", "title", "location", "is_remote"],
                    include: [
                        {
                            model: Company,
                            as: "company",
                            attributes: ["name"],
                        },
                    ],
                },
            ],
            attributes: ["id", "applied_at", "resume_url", "cover_letter"],
        });

        if (existingApplication) {
            // Format the response
            const response = {
                application_id: existingApplication.id,
                job_id: existingApplication.job?.id || null,
                job_title: existingApplication.job?.title || "Unknown Job",
                company: existingApplication.job?.company?.name || "Unknown Company",
                location: existingApplication.job?.is_remote ? "Remoto" : existingApplication.job?.location || "No location",
                applied_at: existingApplication.applied_at,
                resume_url: existingApplication.resume_url,
                cover_letter: existingApplication.cover_letter,
            };

            return res.status(200).json({ hasApplied: true, application: response });
        } else {
            return res.status(200).json({ hasApplied: false });
        }
    } catch (error) {
        console.error("Error checking user application:", error);
        res.status(500).json({ message: "Server error" });
    }
};