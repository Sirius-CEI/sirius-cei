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
})

const indicatorSchema = new Schema({
	title: { type: String, trim: true, required: true },
	copy: { type: String, trim: true },
	active: { type: Boolean, default: false },
	order: { type: Number, default: 100 },
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
	route: { type: String, trim: true, lowercase: true, required: true, index: {
			unique: true,
			partialFilterExpression: { active: { $eq: true } }
		}
	},
	image: String,
	active: { type: Boolean, default: false },
	order: { type: Number, default: 100 },
	notes: String,
	indicators: [indicatorSchema],
});

module.exports = mongoose.model('OutcomeAreas', outcomeAreaSchema);