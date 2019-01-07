const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countySchema = new Schema({
	type: String,
	properties: {
		statefp: String,
		countyfp: String,
		countyns: String,
		affgeoid: String,
		GEOID: { type: String, index: { unique: true }},
		name: String,
		lsad: String,
		aland: Number,
		awater: Number,
	},
	geometry: {
		type: {
			type: String,
			enum: ['Polygon'],
			required: true
		},
		coordinates: {
			type: [[[Number]]],
			required: true
		}
	}
})

module.exports = mongoose.model('County', countySchema);
