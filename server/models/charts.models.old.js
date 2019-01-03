const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chartSchema = new Schema({
	title: { type: String, trim: true, required: true, },
	description: { type: String, trim: true },
	copy: { type: String, trim: true },
	active: { type: Boolean, default: false },
	order: { type: Number, default: 100 },
	toggleText: { type: String, trim: true, required: true, maxlength: 255, },
	query: { type: String, trim: true },
	citation: { type: String, trim: true },
	notes: String,
},
{ timestamps: true })

module.exports = mongoose.model('Chart', chartSchema);