const nodemailer = require("nodemailer");
const talentEmailTemplate = require("./templates/newTalentEmail");
const companyEmailTemplate = require("./templates/newCompanyEmail");
const newSubscriptionEmailTemplate = require("./templates/newSubscriptionEmail");
require("dotenv").config();

const sendTalentEmail = async (to, subject, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use 'SMTP' for custom email providers
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Talentia" <${process.env.EMAIL_USERNAME}>`,
      to: [to, "ramonbriceno12@gmail.com"],
      subject,
      html: talentEmailTemplate(name, to),
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

const sendCompanyEmail = async (to, subject, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use 'SMTP' for custom email providers
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Talentia" <${process.env.EMAIL_USERNAME}>`,
      to: [to, "ramonbriceno12@gmail.com"],
      subject,
      html: companyEmailTemplate(name, to),
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

const sendSubscriptionEmail = async (to, subject, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use 'SMTP' for custom email providers
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Talentia" <${process.env.EMAIL_USERNAME}>`,
      to: [to, "ramonbriceno12@gmail.com"],
      subject,
      html: newSubscriptionEmailTemplate(name, to),
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = { sendTalentEmail, sendCompanyEmail, sendSubscriptionEmail };
