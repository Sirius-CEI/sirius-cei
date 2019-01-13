const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chart = require('./charts.model')
const Upload = require('./upload.model');

const chartDataSchema = new Schema({
    year: { type: Number, required: true},
    variable: { type: Schema.Types.Mixed, required: true},
    value: { type: Number, required: true},
    unit: { type: String },
		chart_id: { type: Schema.Types.ObjectId, ref: 'Chart' },
		upload_id: { type: Schema.Types.ObjectID, ref: 'Upload' }
},{
    timestamps: true
})

module.exports = mongoose.model('ChartData', chartDataSchema);
