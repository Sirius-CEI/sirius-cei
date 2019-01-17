const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chart = require('./charts.model');

const fileInfo = new Schema({
	filename: String,
	user_id: String,
	uuid: String,
	uploadTs: Date,
})

const uploadSchema = new Schema({
    year: { type: Number, required: true},
    variable: { type: Schema.Types.Mixed, required: true},
    value: { type: Number, required: true},
    unit: { type: String },
		chart: { type: Schema.Types.ObjectId, ref: 'Chart' },
		fileInfo: fileInfo
},{
    timestamps: true
})

module.exports = mongoose.model('Upload', uploadSchema);
