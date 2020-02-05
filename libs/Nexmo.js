const Nexmo = require('nexmo');

let options = {};

module.exports = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
    applicationId: process.env.NEXMO_APPLICATION_ID,
    privateKey: process.env.NEXMO_PRIVATE_KEY_PATH
  }, options);