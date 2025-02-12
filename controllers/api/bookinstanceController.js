const BookInstance = require('../../models/bookinstance');
const Book = require('../../models/book');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');


//Display list of all bookinstances.
exports.bookinstances_list = asyncHandler(async (req, res, next) => {
	const allBookInstances = await BookInstance.find({}).populate("book").exec();
	res.json({
		bookinstances: allBookInstances,
	});
});

//Display detail page of a specific bookinstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display bookinstance create form on get.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display bookinstance create form on post.
exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display bookinstance delete form on get.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display bookinstance delete form on post.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display bookinstance update form on get.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});

//Display bookinstance update from on post.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
	res.json({message: "Not implemented"});
});