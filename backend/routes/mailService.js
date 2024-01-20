const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

// const transporter = nodemailer.createTransport({
//     host: emailConfig.host,
//     port: emailConfig.port,
//     secure: emailConfig.secure,
//     ignoreTLS: emailConfig.ignoreTLS
// });

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




// transporter.sendMail({
//     from: '"Your Name" <youremail@gmail.com>', // sender address
//     to: "receiverone@gmail.com, receivertwo@outlook.com", // list of receivers
//     subject: "Medium @edigleyssonsilva ✔", // Subject line
//     text: "There is a new article. It's about sending emails, check it out!", // plain text body
//     html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
//   }).then(info => {
//     console.log({info});
//   }).catch(console.error);