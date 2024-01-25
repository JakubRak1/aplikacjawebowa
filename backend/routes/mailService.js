const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');


const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
    },
});


const sendMail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: emailConfig.user,
            to,
            subject,
            text,
        });

        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendMail };
