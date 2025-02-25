const express = require('express');
const { 
    getTalentApplications,
    getTalentApplicationsDashboard,
    createApplication,
    checkUserApplication,
} = require('../controllers/applicationsController');

const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateJWT, createApplication);
router.get('/talent/:id', authenticateJWT,  getTalentApplications);
router.get('/talent/dashboard/:id', authenticateJWT, getTalentApplicationsDashboard);
router.get('/check', authenticateJWT, checkUserApplication)

module.exports = router;