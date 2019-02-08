const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OutcomeArea = require('./outcome-areas.model');

//Schema for Cards
const cardSchema = new Schema({
	title: { type: String, required: true},
	image: String,
	url: { type: String, required: true},
	outcome_id: { type: Schema.Types.ObjectId, ref: 'OutcomeArea' }
	},
	{ timestamps: true}
);

module.exports = mongoose.model('Card', cardSchema);