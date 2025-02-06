const express = require('express');
const router = express.Router();
const { calendlyClickedByUser, calendlyClickedByCompany, addSubscription } = require('../controllers/actionsController');

router.put('/calendly/:email', calendlyClickedByUser);
router.put('/calendly/company/:email', calendlyClickedByCompany);
router.post('/subscription/', addSubscription);

module.exports = router;