const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
	first_name: { type: String, required: true, maxLenght: 100 },
	last_name: { type: String, required: true, maxlenght: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
	let fullname = "";
	if (this.first_name && this.last_name) {
		fullname = `${this.last_name}, ${this.first_name}`;
	}

	return fullname;
});

AuthorSchema.virtual("url").get(function () {
	return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
	return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATETIME_MED) : "";
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
	return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATETIME_MED) : "";
});

AuthorSchema.virtual("lifespan").get(function () {
	return `${this.date_of_birth_formatted} - ${this.date_of_death_formatted}`;
});

AuthorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
	return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toISODate() : "";
});

AuthorSchema.virtual("date_of_death_yyyy_mm_dd").get(function () {
	return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toISODate() : "";
});

AuthorSchema.virtual("lifespan_yyyy_mm_dd").get(function () {
	return `${this.date_of_birth_yyyy_mm_dd} - ${this.date_of_death_yyyy_mm_dd}`;
});

module.exports = mongoose.model("Author", AuthorSchema);