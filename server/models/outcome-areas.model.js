const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chartSchema = new Schema({
	title: { type: String, trim: true, required: true, },
	description: { type: String, trim: true },
	copy: { type: String, trim: true },
	active: { type: Boolean, default: false },
	toggleText: { type: String, trim: true, required: true, maxlength: 255, },
	query: { type: String, trim: true },
	citation: { type: String, trim: true },
	notes: String,
})

const indicatorSchema = new Schema({
	title: { type: String, trim: true, required: true },
	copy: { type: String, trim: true },
	active: { type: Boolean, default: false },
	notes: String,
	charts: [chartSchema]
})

const outcomeAreaSchema = new Schema({
	title: { type: String, trim: true, required: true, index: {
		unique: true,
		partialFilterExpression: { active: { $eq: true } }
		}
	},
	copy: { type: String, trim: true },
	// route in App.js for this outcome area
	route: String,
	active: { type: Boolean, default: false },
	notes: String,
	indicators: [indicatorSchema],
});

module.exports = mongoose.model('OutcomeAreas', outcomeAreaSchema);