const Genre = require('../../models/genre');
const Book = require('../../models/book');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
	const allGenres = await Genre.find({}).sort({ name: 1 }).exec();

	res.json({
		Genres: allGenres,
	});
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"})
});

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
	res.json({message: "Not implemented"})
};

// Handle Genre create on POST.
exports.genre_create_post = asyncHandler(async(req, res, next) => {
	res.json({message: "Not implemented"});
});

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"})
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"})
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"})
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"})
});