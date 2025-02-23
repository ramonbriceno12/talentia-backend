const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const { uploadResume, uploadApplication, uploadTalent, uploadCompany, uploadProposal } = require('../controllers/uploadController');

// Upload Resume
router.post('/resume', upload.single('resume'), uploadResume);

//Upload application
router.post('/application', upload.single('resume'), uploadApplication);

//Upload talent
router.post('/talent', upload.fields([{ name: "resume" }, { name: "avatar" }]), uploadTalent);

//Upload company
router.post('/company', upload.single('jobRequirements'), uploadCompany);

//Upload proposal
router.post('/proposal',  uploadProposal);

module.exports = router;
