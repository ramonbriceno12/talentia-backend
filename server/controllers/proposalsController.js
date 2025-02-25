const Proposal = require("../models/proposalsModel");
const User = require("../models/userModel");

exports.getTalentProposals = async (req, res) => {
    try {
        const id = req.params.id; // Talent ID

        // Fetch proposals received by the talent
        const proposals = await Proposal.findAll({
            where: { talent_id: id },
            include: [
                {
                    model: User,
                    as: "proposalUser", // The user who sent the proposal
                    attributes: ["id", "full_name", "email"], // Fetch necessary fields
                },
            ],
            attributes: ["id", "description", "created_at"],
            order: [["created_at", "DESC"]],
        });

        const proposalsCount = await Proposal.count({
            where: { talent_id: id }
        })

        // Format response
        const formattedProposals = proposals.map((proposal) => ({
            id: proposal.id,
            description: proposal.description,
            sent_by: {
                id: proposal.proposalUser?.id || null,
                name: proposal.proposalUser?.full_name || "Unknown",
                email: proposal.proposalUser?.email || "No email",
            },
            created_at: proposal.created_at,
        }));

        res.json({ proposals: formattedProposals, proposalsCount: proposalsCount });
    } catch (error) {
        console.error("Error fetching proposals:", error);
        res.status(500).json({ message: "Server error" });
    }
};
