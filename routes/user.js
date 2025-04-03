const express = require('express');
const router = express.Router();

const { user_list, user_detail, user_create } = require('../controllers/userController');

router.get('/', user_list);

router.get('/:id', user_detail);

router.post('/', user_create);

module.exports = router;