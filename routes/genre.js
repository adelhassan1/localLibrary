const express = require('express');
const router = express.Router();

const genre_controller = require('../controllers/genreController');

router.get("/", genre_controller.genre_list);

router.get("/:id", genre_controller.genre_detail);

router.post("/create", genre_controller.genre_create);

router.delete("/:id", genre_controller.genre_delete);

router.patch("/:id", genre_controller.genre_update);


module.exports = router;