const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Charts = require('./charts.model')

indicatorSchema = new Schema({
	title: { type: String, trim: true, required: true },
	copy: { type: String, trim: true },
	active: { type: Boolean, default: false },
	order: { type: Number, default: 100 },
	notes: String,
	charts: [{type: Schema.Types.ObjectId, ref: 'Charts'}]
},
{ timestamps: true });

module.exports = mongoose.model('Indicators', indicatorSchema);