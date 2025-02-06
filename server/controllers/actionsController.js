const User = require("../models/userModel");
const Company = require("../models/companiesModel");
const { sendSubscriptionEmail } = require("../utils/sendEmails");

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

const addSubscription = async (req, res) => {
    
    try {
        const {name, email} = req.body;
        const user = await User.findOne({ where: { email } });

        if(!user){
            await User.create({
                full_name: name,
                email,
                role: 'talent',
                subscribed: true,
            });
        }else{
            user.subscribed = true;
            await user.save();
        }

        sendSubscriptionEmail(email, 'Talentia - PDF Gratis para mejorar tu perfil profesional 📥', name);

        res.status(200).json({ message: "Subscription added successfully", email: user.email });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding subscription" });
    }

}

module.exports = { calendlyClickedByUser, calendlyClickedByCompany, addSubscription };