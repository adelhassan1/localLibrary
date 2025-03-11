const express = require('express');
const router = express.Router();

const author_controller = require('../controllers/authorController');

router.get('/', author_controller.author_list);

router.get('/:id', author_controller.author_detail);

router.post('/create', author_controller.author_create);

router.patch('/:id', author_controller.author_update);

router.delete('/:id', author_controller.author_delele);

module.exports = router;