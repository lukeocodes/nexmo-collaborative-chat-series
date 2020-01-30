var express = require('express');
var router = express.Router();

router.get('/session', function(req, res, next) {
  res.json({ 
    user: process.env.NEXMO_USER,
    displayName: process.env.NEXMO_DISPLAYNAME,
    jwt: process.env.NEXMO_TOKEN
  });
});

module.exports = router;
