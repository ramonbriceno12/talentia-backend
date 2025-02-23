const express = require('express');
const { upload } = require('../middleware/upload');
const { 
    getAllTalents, 
    getTalentById, 
    createTalent, 
    updateTalentProfile, 
    deleteTalent,
    updateBioTalent, 
    uploadResume,
    deleteResume,
} = require('../controllers/talentsController');

const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// Get all talents
router.get('/', getAllTalents);

// Get talent by ID
router.get('/:id', getTalentById);

// Create a new talent
router.post('/', authenticateJWT, createTalent);

// Update a talent profile by ID
router.patch('/profile/:id', authenticateJWT, upload.single('profile_picture'), updateTalentProfile);

//Update a talent bio by ID
router.patch('/bio/:id', authenticateJWT, updateBioTalent);

//Add resume to talent
router.post("/:id/resumes", authenticateJWT, upload.single("resume"), uploadResume);

//Delete resume from talent
router.delete("/:id/resumes/:resumeId", authenticateJWT, deleteResume);

// Delete a talent by ID
router.delete('/:id', authenticateJWT, deleteTalent);

module.exports = router;
