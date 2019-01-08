const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countySchema = new Schema({
	type: String,
	properties: {
		GEOID: { type: String, index: { unique: true }, required: true}
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
}, { strict: false })

module.exports = mongoose.model('County', countySchema);
