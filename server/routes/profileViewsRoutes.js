const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware')

const { registerProfileView, getTalentProfileViews } = require("../controllers/profileViewsController");
const router = express.Router();
router.post("/", registerProfileView);
router.get('/:id', authenticateJWT, getTalentProfileViews)

module.exports = router;