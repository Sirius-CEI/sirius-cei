const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tractSchema = new Schema({
	type: String,
	properties: {
		GEOID: { type: String, index: { unique: true }, required: true}
	},
	geometry: {
		type: {
			type: String,
			enum: ['Polygon', 'MultiPolygon'],
			required: true
		}
	}},
	{ strict: false }
);

module.exports = mongoose.model('Tract', tractSchema);