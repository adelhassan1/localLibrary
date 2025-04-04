const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
	title: {type: String, required: true},
	author: {type: Schema.Types.ObjectId, ref: "Author", required: true},
	summary: {type: String, required: true},
	copies: {type: Number, required: true},
	genre: [{type: Schema.Types.ObjectId, ref: "Genre"}],
	created_at: { type: Date },
});

BookSchema.virtual('url').get(function () {
	return `/api/v1/books/${this._id}`;
});

module.exports = mongoose.model("Book", BookSchema);