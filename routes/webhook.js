const express = require('express');
const router = express.Router();

const webhookController = require('../controllers/webhook');

router.post('/events', webhookController.events);

module.exports = router;
