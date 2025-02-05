const express = require('express');
const router = express.Router();
const { calendlyClickedByUser, calendlyClickedByCompany } = require('../controllers/actionsController');

router.put('/calendly/:email', calendlyClickedByUser);
router.put('/calendly/company/:email', calendlyClickedByCompany);

module.exports = router;