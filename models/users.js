const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {type: String, required: true},
	email: {type: mongoose.SchemaTypes.Email, required: true},
	password: {type: String, required: true},
	confirm_password: {type: String, required: true},
	phone: {type: Number, required: true},
	created_at: {type: Date},
});

userSchema.virtual('url').get(function () {
	return `/api/v1/users/${this._id}`;
});

module.exports = mongoose.model('User', userSchema);