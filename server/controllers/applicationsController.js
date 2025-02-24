const Application = require("../models/applicationsModel");
const { Job } = require("../models/jobsModel");
const Company = require("../models/companiesModel");

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
            company: app.job?.Company?.name || "Unknown Company",
            location: app.job?.is_remote ? "Remoto" : app.job?.location || "No location",
            applied_at: app.applied_at,
        }));

        res.json({ applications: formattedApplications, totalApplications: applicationCount });
    } catch (error) {
        console.error("Error fetching job applications for dashboard:", error);
        res.status(500).json({ message: "Server error" });
    }
};