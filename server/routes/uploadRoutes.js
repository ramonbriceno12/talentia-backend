const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const { uploadAvatar, uploadResume, uploadApplication } = require('../controllers/uploadController');

// Upload Avatar
router.post('/avatar', upload.single('avatar'), uploadAvatar);

// Upload Resume
router.post('/resume', upload.single('resume'), uploadResume);

//Upload application
router.post('/application', upload.single('resume'), uploadApplication);

module.exports = router;
