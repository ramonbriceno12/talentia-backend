const express = require('express');
const { getUserPayments, getPaymentById } = require('../controllers/billingController');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/talents/:id', authenticateJWT, getUserPayments);
router.get('/talents/:user_id/payments/:payment_id', authenticateJWT, getPaymentById);


module.exports = router;