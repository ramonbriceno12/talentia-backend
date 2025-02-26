const express = require('express')
const { getConnectionsByTalent, acceptConnection, declineConnection, getMutualConnections } = require('../controllers/connectionsController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/talents/:id', authenticateJWT, getConnectionsByTalent);
router.get('/talents/mutual/:userId/:targetId', getMutualConnections);
router.put('/:id/accept', authenticateJWT, acceptConnection);
router.put('/:id/decline', authenticateJWT, declineConnection)

module.exports = router;