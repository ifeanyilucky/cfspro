const nodemailer = require('nodemailer');
const { gmailConfig } = require('../config');

const sendEmail = (option) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailConfig.email,
      pass: gmailConfig.mailPassword,
      type: 'OAuth2',
      clientId: gmailConfig.clientId,
      clientSecret: gmailConfig.clientSecret,
      refreshToken: gmailConfig.refreshToken,
    },
  });

  const mailOptions = {
    from: gmailConfig.email,
    to: option.to,
    subject: option.subject,
    html: option.html,
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendEmail;
