const { Job, JobCategory } = require('../models/jobsModel');
const Company = require('../models/companiesModel');
const UserSkills = require('../models/userSkills');
const JobSkills = require('../models/jobSkillsModel')
const { fn, col } = require('sequelize');  // Import Sequelize functions directly
const Skills = require('../models/skillsModel');

exports.getJobCategories = async (req, res) => {
  try {
    const categories = await JobCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching job categories' });
  }
};

exports.getAllJobsAdmin = async (req, res) => {
  try {
      // Fetch all jobs with company details
      const jobs = await Job.findAll({
          include: [
              {
                  model: Company,
                  as: "company",
                  attributes: ["name"],
              },
          ],
          attributes: ["id", "title", "location", "is_remote", "createdAt"],
          order: [["createdAt", "DESC"]], // Most recent jobs first
      });

      // Format response
      const formattedJobs = jobs.map((job) => ({
          id: job.id,
          title: job.title,
          company: job.company?.name || "Unknown Company",
          location: job.is_remote ? "Remoto" : job.location || "No location",
          created_at: job.createdAt,
      }));

      res.json({ jobs: formattedJobs });
  } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Server error" });
  }
};

exports.getJobByIdAdmin = async (req, res) => {
  try {
      const id = req.params.id;

      const job = await Job.findOne({
          where: { id },
          include: [
              {
                  model: Company,
                  as: "company",
                  attributes: ["name"],
              },
              {
                  model: JobSkills,
                  as: "JobSkills",
                  include: [
                    { model: Skills, 
                      as: 'skills',
                      attributes: ["name"] 

                    }],
              },
          ],
      });

      if (!job) return res.status(404).json({ message: "Job not found" });

      res.json({
          id: job.id,
          title: job.title,
          company: job.company?.name || "Unknown Company",
          location: job.is_remote ? "Remoto" : job.location,
          is_remote: job.is_remote,
          description: job.description,
          skills: job.JobSkills.map((js) => js.skills.name),
          created_at: job.createdAt,
      });
  } catch (error) {
      console.error("Error fetching job details:", error);
      res.status(500).json({ message: "Server error" });
  }
};

// Get job by ID with application count
exports.getJobById = async (req, res) => {
  // try {
  //   const job = await Job.findByPk(req.params.id, {
  //     include: [
  //       {
  //         model: Application,
  //         attributes: [],
  //       }
  //     ],
  //     attributes: {
  //       include: [
  //         [fn("COUNT", col("Applications.id")), "application_count"]
  //       ]
  //     },
  //     group: ['Job.id']
  //   });

  //   if (!job) return res.status(404).json({ message: 'Job not found' });

  //   res.json(job);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ message: 'Error fetching job' });
  // }
};

exports.getTalentRelatedJob = async (req, res) => {
  try {
    const user_id = req.params.id;

    // Fetch user's skills
    const userSkills = await UserSkills.findAll({
      where: { user_id },
      attributes: ["skill_id"],
    });

    if (!userSkills.length) {
      return res.json({ jobs: [] }); // No skills found, return empty list
    }

    const skillIds = userSkills.map(us => us.skill_id);

    // ✅ Fix: Use alias "JobSkills" in the include statement
    const relatedJobs = await Job.findAll({
      include: [
        {
          model: JobSkills,
          as: "JobSkills", // ✅ Use alias correctly
          where: { skill_id: skillIds },
          attributes: [], // Don't return JobSkill data in response
        },
        {
          model: Company,
          as: 'company',
          attributes: ["id", "name"],
        }
      ],
      limit: 10, // Get up to 10 related jobs
      attributes: ["id", "title", "location", "is_remote", "company_id", "createdAt"],
      distinct: true,
    });

    // Format response
    const formattedJobs = relatedJobs.map(job => ({
      id: job.id,
      title: job.title,
      location: job.location,
      is_remote: job.is_remote,
      company: job.company ? job.company.name : "Unknown Company",
      created_at: job.createdAt
    }));

    res.json({ jobs: formattedJobs });
  } catch (error) {
    console.error("Error fetching related jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Create new job
exports.createJob = async (req, res) => {
  const { company_id, title, description, category, location, is_remote } = req.body;
  try {
    const job = await Job.create({
      company_id,
      title,
      description,
      category,
      location,
      is_remote
    });
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating job' });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  const { title, description, category, location, is_remote } = req.body;
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await job.update({ title, description, category, location, is_remote });
    res.json({ message: 'Job updated successfully', job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating job' });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await job.destroy();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting job' });
  }
};
