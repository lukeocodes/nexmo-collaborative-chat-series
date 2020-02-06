const express = require('express');
const router = express.Router();

const serverController = require('../controllers/server');

router.get('/status', serverController.status);

module.exports = router;
