const express = require('express')
const { getConnectionsByTalent, acceptConnection, declineConnection, getMutualConnections, sendConnectionRequest, getConnectionStatuses, getConnectionsCount } = require('../controllers/connectionsController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/talents/:id', authenticateJWT, getConnectionsByTalent);
router.get('/talents/mutual/:userId/:targetId', getMutualConnections);
router.post("/request", sendConnectionRequest); // Send a connection request
router.get("/status/:userId/:targetId", authenticateJWT, getConnectionStatuses); // Check connection status
router.post("/statuses/:userId", authenticateJWT, getConnectionStatuses); // Fetch all connection statuses at once
router.put("/:id/accept", authenticateJWT, acceptConnection); // Accept connection
router.put("/:id/decline", authenticateJWT, declineConnection);
router.get('/count', authenticateJWT, getConnectionsCount);

module.exports = router;