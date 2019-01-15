const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');

module.exports = new Schema({
	filename: { type: String, required: true },
	uuid: { type: String },
	user_id: String
},{
    timestamps: true
})