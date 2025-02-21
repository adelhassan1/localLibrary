const Book = require('../../models/book');
const asyncHandler = require('express-async-handler');
const { checkSchema, validationResult } = require('express-validator');

//Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
	const allBooks = await Book.find({}, "title author").sort({ title: 1 }).populate("author").exec();
	res.json({
		Books: allBooks,
	});
});

//Display detail page of a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
	const book = await Book.findById(req.params.id).populate('author').populate('genre').exec();

	if (book === null) {
		const error = new Error("book not found.");
		error.status = 404;
		return next(error);
	};

	res.json({
		book: book,
	});
});


//Display book create form on post.
exports.book_create = [
	(req, res, next) => {
		if (!Array.isArray(req.body.genre)) {
			req.body.genre =
				typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
		}
		next();
	},

	checkSchema({
		title: {
			errorMessage: "Title must not be empty.",
			trim: true,
			isLength: { options: { min: 3 } },
			escape: true,
		},
		author: {
			errorMessage: "Author must not be empty.",
			trim: true,
			isLength: { options: { min: 3 } },
			escape: true,
		},
		summary: {
			errorMessage: "Summary must not be empty.",
			trim: true,
			isLength: { options: { min: 3 } },
			escape: true,
		},
		copies: {
			errorMessage: "Copies must not be empty.",
			trim: true,
			isNumeric: { errorMessage: "Copies must be a valid number." },
			isLength: { options: { min: 1 } },
			escape: true,
		},
		'genre.*': {
			escape: true,
		}
	}),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const book = new Book({
			title: req.body.title,
			author: req.body.author,
			summary: req.body.summary,
			copies: req.body.copies,
			genre: req.body.gerne,
		});

		if (!errors.isEmpty) {
			res.json({ errors: errors.array() });
		} else {
			await book.save();
			res.status(201).json({ message: "Book created.", date: req.body });
		}
	})
]

//Display book delete form on post.
exports.book_delete = asyncHandler(async (req, res, next) => {
	const book = await Book.findById(req.params.id).exec();

	if (book === null) {
		const error = new Error("Book not found.");
		error.status = 404;
		return next(error);
	} else {
		await Book.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Book deleted." });
	}
});

//Display book update from on post.
exports.book_update = [
	(req, res, next) => {
		if (!Array.isArray(req.body.genre)) {
			req.body.genre =
				typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
		}
		next();
	},

	checkSchema({
		title: {
			errorMessage: "Title must not be empty.",
			trim: true,
			isLength: { options: { min: 3 } },
			escape: true,
		},
		author: {
			errorMessage: "Author must not be empty.",
			trim: true,
			isLength: { options: { min: 3 } },
			escape: true,
		},
		summary: {
			errorMessage: "Summary must not be empty.",
			trim: true,
			isLength: { options: { min: 3 } },
			escape: true,
		},
		copies: {
			errorMessage: "Copies must not be empty.",
			trim: true,
			isNumeric: { errorMessage: "Copies must be a valid number." },
			isLength: { options: { min: 1 } },
			escape: true,
		},
		'genre.*': {
			escape: true,
		}
	}),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const book = new Book({
			title: req.body.title,
			author: req.body.author,
			summary: req.body.summary,
			copies: req.body.copies,
			genre: req.body.gerne,
			_id: req.params.id
		});

		if (!errors.isEmpty) {
			res.json({ errors: errors.array() });
		} else {
			await Book.findByIdAndUpdate(req.params.id, book, {}).populate("author").populate("genre");
			res.status(200).json({ message: "Book updated.", date: req.body });
		}
	})
]