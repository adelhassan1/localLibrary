const Author = require('../../models/author');
const Book = require('../../models/book');
const asyncHandler = require('express-async-handler');
const { checkSchema, validationResult } = require('express-validator');

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
	res.json({
		title: "Create Author",
		action: "/api/v1/author/create",
		method: "POST",
		fields: [
			{ name: "firstname", type: "text", label: "First Name", required: true },
			{ name: "lastname", type: "text", label: "family Name", required: true },
			{ name: "date_of_birth", type: "text", label: "Date of Birth" },
			{ name: "date_of_death", type: "text", label: "Date of Death" },
		],
	});
});

//Display Author create form on post.
exports.author_create_post = [
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
];

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