const Author = require('../../models/author');
const Book = require('../../models/book');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

//Display list of all authors.
exports.author_list = asyncHandler(async (req, res, next) => {
	const allAuthors = await Author.find({}).sort({ family_name: 1 }).exec();

	res.json({
		Authors: allAuthors,
	});
});

//Display detail page for a specifc author.
exports.author_detail = asyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, "title summary").exec(),
	]);

	if (author === null) {
		const err = new Error("Author Not Found");
		err.status = 404;
		return next(err);
	}

	res.json({
		author: author,
		author_books: allBooksByAuthor,
	});
});

//Display Author create form on get.
exports.author_create_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display Author create form on post.
exports.author_create_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display Author delete form on get.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display Author delete form on post.
exports.author_detele_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display Author update form on get.
exports.author_update_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display Author update form on post.
exports.author_update_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});