const Genre = require('../../models/genre');
const Book = require('../../models/book');
const asyncHandler = require('express-async-handler');
const { checkSchema, validationResult } = require('express-validator');

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
	const allGenres = await Genre.find({}).sort({ name: 1 }).exec();

	res.json({
		Genres: allGenres,
	});
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
	const [ genre, booksInGenre ] = await Promise.all([
		Genre.findById(req.params.id).exec(),
		Book.find({ genre: req.params.id }, "title summary").exec(),
	]);

	if (genre === null) {
		const error = new Error("Genre not found.");
		error.status = 404;
		return next(error);
	} else {
		res.status(200).json({
			genre: genre,
			genre_books: booksInGenre,
		});
	}
});

exports.genre_create = [
	checkSchema({
		name: {
			trim: true,
			errorMessage: "Genre name must contain more than 3 characters.",
			isLength: { options: { min: 3 } },
			escape: true,
		},
	}),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const genre = new Genre({ name: req.body.name });

		if (!errors.isEmpty()) {
			res.json({ errors: errors.array() });
			return;
		} else {
			const genreExists = await Genre.findOne({ name: req.body.name }).collation({ locale: "en", strength: 2 }).exec();

			if (genreExists) {
				res.json({ message: "Genre already exists."});
			} else {
				await genre.save();
				res.status(201).json({ message: "Genre created."});
			}
		}
	}),
];

exports.genre_delete = asyncHandler(async (req, res, next) => {
	const [ genre, allBooksWithGenre ] = await Promise.all([
		Genre.findById(req.params.id).exec(),
		Book.find({ genre: req.params.id}, "title summary").exec(),
	]);

	if (genre === null) {
		const error = new Error("Genre not found.");
		error.status = 404;
		return next(error);
	} else {
		if (allBooksWithGenre.length > 0) {
			const err = new Error("Can't delete genre before deleting its books.");
			err.status = 400;
			return next(err);
		} else {
			await Genre.findByIdAndDelete(req.params.id);
			res.status(200).json({ message: "Genre deleted." });
		}
	}
});

exports.genre_update = [
	checkSchema({
		name: {
			errorMessage: "Genre name must contain at least 3 characters.",
			trim: true,
			isLength: { options: { min: 3 } },
			escape: true,
		},
	}),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const genre = new Genre({
			name: req.body.name,
			_id: req.params.id,
		});

		if (!errors.isEmpty()) {
			res.json({ errors: errors.array() });
			return;
		} else {
			await Genre.findByIdAndUpdate(req.params.id, genre, {});
			res.status(200).json({ message: "Genre updated."});
		}
	})
]