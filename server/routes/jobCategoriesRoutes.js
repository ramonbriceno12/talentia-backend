const express = require('express');
const {
    getAllJobCategories,
    getJobCategoryById,
    createJobCategory,
    updateJobCategory,
    deleteJobCategory
} = require('../controllers/jobCategoriesController');

const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// Get all job categories
router.get('/', getAllJobCategories);

// Get job category by ID
router.get('/:id', getJobCategoryById);

// Create a new job category
router.post('/', authenticateJWT, createJobCategory);

// Update a job category by ID
router.put('/:id', authenticateJWT, updateJobCategory);

// Delete a job category by ID
router.delete('/:id', authenticateJWT, deleteJobCategory);

module.exports = router;
