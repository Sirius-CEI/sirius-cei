const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chart = require('./charts.model')

const indicatorSchema = new Schema({
	title: { type: String, trim: true, required: true },
	copy: { type: String, trim: true },
	active: { type: Boolean, default: false },
	order: { type: Number, default: 100 },
	notes: String,
	charts: [{type: Schema.Types.ObjectId, ref: 'Chart'}]
},
{ timestamps: true })

const Indicator = mongoose.model('Indicators', indicatorSchema)

module.exports = {
	Indicator,
	indicatorSchema
}