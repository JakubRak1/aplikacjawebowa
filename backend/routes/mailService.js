const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    ignoreTLS: emailConfig.ignoreTLS
});

const sendMail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: 'cario@example.com',
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