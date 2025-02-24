const express = require('express');
const { 
    getTalentApplications,
    getTalentApplicationsDashboard,
} = require('../controllers/applicationsController');

const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/talent/:id', authenticateJWT,  getTalentApplications)
router.get('/talent/dashboard/:id', authenticateJWT, getTalentApplicationsDashboard)

module.exports = router;