const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const indicatorSchema = new Schema({
	title: { type: String, trim: true, required: true },
	copy: { type: String, trim: true },
	active: { type: Boolean, default: false },
	order: { type: Number, default: 100 },
	notes: String,
	charts: [chartSchema]
})

module.exports = mongoose.model('Indicators', indicatorSchema);