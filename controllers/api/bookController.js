const Book = require('../../models/book');
const Author = require('../../models/author');
const BookInstance = require('../../models/bookinstance');
const Genre = require('../../models/genre');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
	const [
		numBooks,
		numBookInstances,
		numAvailableBookInstances,
		numAuthors,
		numGenres,
	] = await Promise.all([
		Book.countDocuments({}).exec(),
		BookInstance.countDocuments({}).exec(),
		BookInstance.countDocuments({ status: 'Available' }).exec(),
		Author.countDocuments({}).exec(),
		Genre.countDocuments({}).exec(),
	]);

	res.json({
		Books: numBooks,
		Copies: numBookInstances,
		AvailableCopies: numAvailableBookInstances,
		Authors: numAuthors,
		Genres: numGenres,
	});
});

//Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
	const allBooks = await Book.find({}, "title author").sort({ title: 1 }).populate("author").exec();
	res.json({
		Books: allBooks,
	});
});

//Display detail page of a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display book create form on get.
exports.book_create_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display book create form on post.
exports.book_create_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display book delete form on get.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display book delete form on post.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display book update form on get.
exports.book_update_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display book update from on post.
exports.book_update_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});