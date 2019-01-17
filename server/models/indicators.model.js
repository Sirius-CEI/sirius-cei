const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OutcomeArea = require('./outcome-areas.model');

const indicatorSchema = new Schema({
	title: { type: String, trim: true, required: true },
	chart_title: { type: String, trim: true },
	what_this_means_copy: { type: String, trim: true },
	why_this_matters_copy: { type: String, trim: true },
	trend: { type: String, enum: ['positive', 'negative', 'neutral']},
	trend_copy: { type: String, trim: true },
	active: { type: Boolean, default: false },
	order: { type: Number, default: 100 },
	outcome_id: { type: Schema.Types.ObjectId, ref: 'OutcomeArea' }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Indicator', indicatorSchema);