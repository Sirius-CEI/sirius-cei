const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Indicator = require('./indicators.model');

const chartSchema = new Schema(
	{
		active: { type: Boolean, default: false },
		order: { type: Number, default: 100 },
		type: { type: String, enum: ['line', 'map'], required: true },
		title: { type: String, trim: true },
		citation: { type: String, trim: true },
		options: Schema.Types.Mixed,
		indicator_id: { type: Schema.Types.ObjectId, ref: 'Indicator' }
	},
	{ timestamps: true }
);

const mapChartSchema = new Schema(
	{
		map_level: { type: String, enum: ['tract', 'county', 'MSA', 'state'] },
	},
	{ timestamps: true }
)

const lineChartSchema = new Schema(
	{
		vAxisTitle: String,
		vAxisMax: Number,
		vAxisMin: Number,
		vAxisFormat: {
			type: String,
			enum: [ 'none', 'decimal', 'scientific', 'currency', 'percent', 'short', 'long']
		},
		vAxisUnit: String,
		variables: [String]
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Chart', chartSchema);