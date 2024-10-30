// Require the Nodemailer module
const nodemailer = require('nodemailer');

// Create a transporter using SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail', // or your email service provider
    auth: {
        user: 'abhishek17jmt@gmail.com', // your email address
        pass: 'ngilediojfribvue' // your password
    }
});

// Define email options
let mailOptions = {
    from: 'abhishek17jmt@gmail.com', // sender address
    to: 'abhishek2001jmt@gmail.com', // array of receivers
    subject: 'Hello from Node.js', // Subject line
    text: 'Hi user, a new song has been added have a look at it', // Plain text body
    html: '<p>Hi user, a <b>new song</b> has been added have a look at it </p>' // HTML body
};

// Send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});