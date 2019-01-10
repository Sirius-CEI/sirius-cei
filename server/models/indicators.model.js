const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OutcomeArea = require('./outcome-areas.model');

const indicatorSchema = new Schema({
	title: { type: String, trim: true, required: true },
	copy: { type: String, trim: true },
	active: { type: Boolean, default: false },
	order: { type: Number, default: 100 },
	notes: String,
	outcome_id: { type: Schema.Types.ObjectId, ref: 'OutcomeArea' }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Indicator', indicatorSchema);