const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Indicator = require('./indicators.model');

const chartSchema = new Schema({
	type: { type: String, enum: ['line', 'map'], required: true },
	map_level: { type: String, enum: ['tract', 'county', 'MSA', 'state', ''] },
	active: { type: Boolean, default: false },
	order: { type: Number, default: 100 },
	citation: { type: String, trim: true },
	indicator_id: { type: Schema.Types.ObjectId, ref: 'Indicator'}
	},
	{ timestamps: true, strict: false }
);

module.exports = mongoose.model('Chart', chartSchema);
