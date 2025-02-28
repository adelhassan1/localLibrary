const Author = require('../models/author');
const Book = require('../models/book');
const asyncHandler = require('express-async-handler');
const { body, validationResult, checkSchema } = require('express-validator');

// Display list of all Authors.
exports.author_list = asyncHandler(async (req, res, next) => {
	const allAuthors = await Author.find().sort({ last_name: 1 }).exec();

	res.render("author_list", {
		title: "Author List",
		author_list: allAuthors,
	});
});

// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, "title summary").exec(),
	]);

	if (author === null) {
		const err = new Error("Author not found");
		err.status = 404;
		return next(err);
	}

	res.render("author_detail", {
		title: "Author Detail",
		author: author,
		author_books: allBooksByAuthor,
	});
});

// Display Author create form on GET.
exports.author_create_get = (req, res, next) => {
	res.render('author_form', { title: "Create Author" });
};

// Handle Author create on POST.
exports.author_create_post = [
	checkSchema({
		first_name: {
			trim: true,
			isLength: {
				options: { min: 3 },
				errorMessage: "First name must be more than 3 characters.",
			},
			escape: true,
			isAlphanumeric: {
				errorMessage: "First name must be alphanumeric characters.",
			},
		},
		family_name: {
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
	// body("first_name").trim().isLength({ min: 1 }).escape()
	// 	.withMessage("First name must be specified.")
	// 	.isAlphanumeric()
	// 	.withMessage("First name has non-alphanumeric characters."),
	// body("last_name").trim().isLength({ min: 1 }).escape()
	// 	.withMessage("Last name must be specified.")
	// 	.isAlphanumeric()
	// 	.withMessage("Last name has non-alpanumeric characters."),
	// body("date_of_birth", "Invalid date of birth")
	// 	.optional({ values: "falsy" })
	// 	.isISO8601()
	// 	.toDate(),
	// body("date_of_death", "Invalid date of death")
	// 	.optional({ values: "falsy" })
	// 	.isISO8601()
	// 	.toDate(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const author = new Author({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			date_of_birth: req.body.date_of_birth,
			date_of_death: req.body.date_of_death,
		});

		if (!errors.isEmpty()) {
			res.render("author_form", {
				title: "Create Author",
				author: author,
				errors: errors.array(),
			});
			return;
		} else {
			await author.save();
			res.redirect(author.url);
		}
	}),
];

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, "title summary").exec(),
	]);

	if (author === null) {
		res.redirect("/catalog/authors");
	}

	res.render("author_delete", {
		title: "Delete Author",
		author: author,
		author_books: allBooksByAuthor,
	});
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, "title summary").exec(),
	]);

	if (allBooksByAuthor.length > 0) {
		res.render("author_delete", {
			title: "Delete Author",
			author: author,
			author_books: allBooksByAuthor,
		});
		return;
	} else {
		await Author.findByIdAndDelete(req.body.authorid);
		res.redirect("/catalog/authors");
	}
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
	res.render("author_form", { title: "Update Author" });
});

// Handle Author update on POST.
exports.author_update_post = [
	body("last_name").trim().isLength({ min: 1 }).escape()
		.withMessage("Family name must not be empty.")
		.isAlphanumeric()
		.withMessage("Family name has non-alphanumeric characters."),
	body("first_name").trim().isLength({ min: 1 }).escape()
		.withMessage("First name must not be empty.")
		.isAlphanumeric()
		.withMessage("First name has non-alphanumeric characters."),
	body("date_of_birth", "Invalid date of birth")
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),
	body("date_of_death", "Invalid date of death")
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const author = new Author({
			last_name: req.body.last_name,
			first_name: req.body.first_name,
			date_of_birth: req.body.date_of_birth,
			date_of_death: req.body.date_of_death,
			_id: req.params.id,
		});

		if (!errors.isEmpty) {
			res.render("author_form", {
				title: "Update author",
				author: author,
				errors: errors.array(),
			});
			return;
		} else {
			const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, author, {});
			res.redirect(updatedAuthor.url);
		}
	}),
];
