const express = require("express");
const { getTalentProposals } = require("../controllers/proposalsController");
const router = express.Router();

router.get("/talent/:id", getTalentProposals); // Fetch all proposals for a talent

module.exports = router;
