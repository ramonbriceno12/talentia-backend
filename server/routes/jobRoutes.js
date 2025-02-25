const express = require('express');
const { 
    getAllJobs, 
    getJobById, 
    createJob, 
    updateJob, 
    deleteJob, 
    getJobCategories,
    getTalentRelatedJob,
    getAllJobsAdmin,
    getJobByIdAdmin,
} = require('../controllers/jobsController');

const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// Get all jobs
// router.get('/', getAllJobs);

//Get all jobs for user
router.get("/admin/all", authenticateJWT, getAllJobsAdmin); 

//Get job by id admin
router.get('/admin/:id', authenticateJWT, getJobByIdAdmin);

// Get Job Categories
router.get('/categories/', getJobCategories);

//Get Talent Related Jobs

router.get('/talent/related/:id', authenticateJWT, getTalentRelatedJob)

// Get job by ID
router.get('/:id', getJobById);

// Create a new job
router.post('/', authenticateJWT, createJob);

// Update a job by ID
router.put('/:id', authenticateJWT, updateJob);

// Delete a job by ID
router.delete('/:id', authenticateJWT, deleteJob);

module.exports = router;
