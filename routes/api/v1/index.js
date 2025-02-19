const express = require('express');
const router = express.Router();
const home = require('../../../controllers/api/home')

router.get('/', home.index);

module.exports = router;