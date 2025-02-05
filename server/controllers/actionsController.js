const User = require("../models/userModel");
const Company = require("../models/companiesModel");

const calendlyClickedByUser = async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email.toLowerCase());
        console.log('Pasmos por aqui')
        
        const user = await User.findOne({ where: { email } }); // Find user by email
    
        if (!user) return res.status(404).json({ message: "User not found" });
    
        user.calendly_clicked = true;
        await user.save();
    
        res.json({ message: "Calendly clicked updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating calendly clicked" });
    }
};

const calendlyClickedByCompany = async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email.toLowerCase());
    
        const company = await Company.findOne({ where: { email } }); // Find company by email
    
        if (!company) return res.status(404).json({ message: "Company not found" });
    
        company.calendly_clicked = true;
        await company.save();
    
        res.json({ message: "Calendly clicked updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating calendly clicked" });
    }
}

module.exports = { calendlyClickedByUser, calendlyClickedByCompany };