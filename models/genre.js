const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
	name: {type: String, required: true, min: 3, max: 100},
});

GenreSchema.virtual('url').get(function () {
	return `/api/v1/genres/${this._id}`;
});

module.exports = mongoose.model("Genre", GenreSchema);