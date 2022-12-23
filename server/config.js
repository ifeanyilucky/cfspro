const website = 'https://www.crestfinancepro.com';
const host = 'https://app.crestfinancepro.com';
const gmailConfig = {
  mailPassword: process.env.MAIL_PASSWORD,
  email: process.env.EMAIL,
  clientSecret: process.env.CLIENT_SECRET,
  clientId: process.env.CLIENT_ID,
  refreshToken: process.env.REFRESH_TOKEN,
};

module.exports = {
  gmailConfig,
  website,
  host,
};
