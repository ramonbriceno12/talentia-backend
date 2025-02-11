const express = require('express');
const { 
    getAllTalents, 
    getTalentById, 
    createTalent, 
    updateTalent, 
    deleteTalent 
} = require('../controllers/talentsController');

const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// Get all talents
router.get('/', getAllTalents);

// Get talent by ID
router.get('/:id', getTalentById);

// Create a new talent
router.post('/', authenticateJWT, createTalent);

// Update a talent by ID
router.put('/:id', authenticateJWT, updateTalent);

// Delete a talent by ID
router.delete('/:id', authenticateJWT, deleteTalent);

module.exports = router;
