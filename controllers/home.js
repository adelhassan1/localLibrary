const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
	const [
		numBooks,
		numAuthors,
		numGenres,
	] = await Promise.all([
		Book.countDocuments({}).exec(),
		Author.countDocuments({}).exec(),
		Genre.countDocuments({}).exec(),
	]);

	res.json({
		Books: numBooks,
		Authors: numAuthors,
		Genres: numGenres,
	});
});