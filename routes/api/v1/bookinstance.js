const express = require('express');
const router = express.Router();

const bookinstance_controller = require('../../../controllers/api/bookinstanceController');

router.get('/bookinstances', bookinstance_controller.bookinstances_list);
router.get('/bookinstance/:id', bookinstance_controller.bookinstance_detail);

router.get('/bookinstance/create', bookinstance_controller.bookinstance_create_get);
router.post('/bookinstance/create', bookinstance_controller.bookinstance_create_post);

router.get('/bookinstance/:id/delete', bookinstance_controller.bookinstance_delete_get);
router.post('/bookinstance/:id/delete', bookinstance_controller.bookinstance_delete_post);

router.get('/bookinstance/:id/update', bookinstance_controller.bookinstance_update_get);
router.post('/bookinstance/:id/update', bookinstance_controller.bookinstance_update_post);

module.exports = router;