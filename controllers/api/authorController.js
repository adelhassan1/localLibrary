const Author = require('../../models/author');
const Book = require('../../models/book');
const asyncHandler = require('express-async-handler');
const { checkSchema, validationResult } = require('express-validator');

//Display list of all authors.
exports.author_list = asyncHandler(async (req, res, next) => {
	const allAuthors = await Author.find({}).sort({ last_name: 1 }).exec();

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

//Display Author create form on post.
exports.author_create = [
	checkSchema({
		first_name: {
			trim: true,
			isLength: {
				options: { min: 3 },
				errorMessage: "FIRST name must be more than 3 characters.",
			},
			escape: true,
			isAlphanumeric: {
				errorMessage: "First name must be alphanumeric characters.",
			},
		},
		last_name: {
			trim: true,
			isLength: {
				options: { min: 3 },
				errorMessage: "Last name must be more than 3 characters.",
			},
			escape: true,
			isAlphanumeric: {
				errorMessage: "Last name must be alphanumeric characters.",
			},
		},
		date_of_birth: {
			errorMessage: "Invalid date of birth.",
			optional: { options: { values: 'falsy' } },
			isBefore: true,
			isISO8601: true,
			toDate: true,
		},
		date_of_death: {
			errorMessage: "Invalid date of death.",
			optional: { options: { values: 'falsy' } },
			isISO8601: true,
			toDate: true,
		},
	}),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const author = new Author({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			date_of_birth: req.body.date_of_birth,
			date_of_death: req.body.date_of_death,
			created_at: Date.now(),
		});

		if (!errors.isEmpty) {
			res.json({errors: errors.array()});
			return;
		} else {
			await author.save();
			res.status(201).json({ message: 'author created', data: req.body });
		}
	}),
];

//Display Author delete form on post.
exports.author_delele = asyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, "title summary").exec(),
	]);

	if (!author) {
		return res.status(404).json({ message: "Author not found." });
	}

	if (allBooksByAuthor.length > 0) {
		return res.status(400).json({ message: "Delete all author books first." });
	} else {
		await Author.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Author Deleted." });
	}
});

//Display Author update form on post.
exports.author_update = [
	checkSchema({
		first_name: {
			trim: true,
			isLength: {
				options: { min: 3 },
				errorMessage: "First name must be more than 3 characters.",
			},
			escape: true,
			isAlphanumeric: { errorMessage: "First name must be alphanumeric characters." },
		},
		last_name: {
			trim: true,
			isLength: {
				options: { min: 3 },
				errorMessage: "Last name must be more than 3 characters.",
			},
			escape: true,
			isAlphanumeric: { errorMessage: "Last name must be alphanumeric characters." },
		},
		date_of_birth: {
			errorMessage: "Invalid date of birth.",
			optional: { options: { values: "falsy" } },
			isISO8601: true,
			isBefore: true,
			toDate: true,
		},
		date_of_death: {
			errorMessage: "Invalid date of death.",
			optional: { options: { values: 'falsy' } },
			isBefore: true,
			isISO8601: true,
			toDate: true,
		},
	}),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const author = new Author({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			date_of_birth: req.body.date_of_birth,
			date_of_death: req.body.date_of_death,
			_id: req.params.id,
		});

		if (!errors.isEmpty) {
			res.json({ errors: errors.array() });
		} else {
			await Author.findByIdAndUpdate(req.params.id, author, {});
			res.status(200).json({ message: "Updated Successfully." });
		}
	})
];