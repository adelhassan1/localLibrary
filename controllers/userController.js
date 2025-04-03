const asyncHandler = require('express-async-handler');
const { checkSchema, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/users');

// Display list of all users.
exports.user_list = asyncHandler(async (req, res, next) => {
	const users = await User.find({}).exec();

	res.json({ users });
});

// Display detail page for a specific user.
exports.user_detail = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id).exec();

	// check if the user exists otherwise send an error.
	if (user === null) {
		const err = new Error('User not found.');
		err.status = 404;
		return next(err);
	};

	res.json({ user });
});

exports.user_create = [
	checkSchema({
		username: {
			ltrim: true,
			rtrim: true,
			isLength: {
				options: { min: 3, max: 30 },
				errorMessage: "Invalid username",
			},
			escape: true,
		},
		email: {
			isEmail: true,
			trim: true,
			normalizeEmail: {
				options: {
					all_lowercase: true,
					gmail_remove_subaddress: true,
					gmail_remove_dots: true,
					gmail_convert_googlemaildotcom: true,
					outlookdotcom_remove_subaddress: true,
					yahoo_remove_subaddress: true,
					icloud_remove_subaddress: true,
				}
			},
			errorMessage: "Invalid email address",
		},
		password: {
			isLength: {
				options: { min: 12 },
				errorMessage: "password must be at least 12 characters long",
			}
		},
		confirm_password: {
			custom: {
				options: (value, { req }) => {
					if (value !== req.body.password) {
						throw new Error("password doesn't match")
					}
					return true;
				},
			},
		},
		phone: {
			isMobilePhone: {
				errorMessage: "Invalid mobile nubmer"
			},
		},
	}),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const { email, password, confirm_password } = req.body;
		const saltRounds = 10;
		let user = await User.findOne({ email });
		if (user) return res.status(400).send("User already exists.");

		const hash = await bcrypt.hash(password, saltRounds);
		const hashConfirmation = await bcrypt.hash(confirm_password, saltRounds);

		user = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash,
			confirm_password: hashConfirmation,
			phone: req.body.phone,
			created_at: Date.now(),
		});

		if (!errors.isEmpty()) {
			res.status(500).json({ errors });
			return;
		} else {
			await user.save();
			res.status(201).json({message: "user created", data: req.body})
		}
	}),
]