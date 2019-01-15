const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chart = require('./charts.model');
const fileSchema = require('./files.model');

const uploadSchema = new Schema({
    year: { type: Number, required: true},
    variable: { type: Schema.Types.Mixed, required: true},
    value: { type: Number, required: true},
    unit: { type: String },
		// file: fileSchema,
		chart: { type: Schema.Types.ObjectId, ref: 'Chart' },
		fileInfo: fileSchema,
		// file_id: { type: Schema.Types.ObjectId, ref: 'File' },
},{
    timestamps: true
})

module.exports = mongoose.model('Upload', uploadSchema);
