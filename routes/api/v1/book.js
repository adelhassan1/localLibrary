const express = require('express');
const router = express.Router();

const book_controller = require('../../../controllers/api/bookController');

router.get('/', book_controller.book_list);

router.get('/:id', book_controller.book_detail);

router.post('/create', book_controller.book_create);

router.delete('/:id', book_controller.book_delete);

router.patch('/:id', book_controller.book_update);


module.exports = router;