const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chart = require('./charts.model');

const uploadSchema = new Schema({
    year: { type: Number, required: true},
    variable: { type: Schema.Types.Mixed, required: true},
    value: { type: Number, required: true},
    unit: { type: String },
    chart: { type: Schema.Types.ObjectId, ref: 'Chart.title' },
},{
    timestamps: true
})

module.exports = mongoose.model('Upload', uploadSchema);
