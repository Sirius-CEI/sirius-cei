const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const csv = require('csvtojson');
const path = require('path');

// MONGOOSE SCHEMA //

const Schema = mongoose.Schema;

//Schema for geography collection
const indicatorsSchema = new Schema({
    indicator_variable: { type: String, required: true},
    alternate_name: { type: String, required: true},
    status_flag: { type: String, required: true},
    indicator_name: { type: String, required: true},
    description: { type: String, required: true},
    units: { type: String, required: true},
    concept: { type: String, required: true},
    base: { type: String, required: true},
});

const Indicators = mongoose.model('indicator_data', indicatorsSchema);

// Get geographies from csv files
router.get('/indicators', (req, res) => {
    let filePath = path.join(__dirname, '../constants/indicators.csv');
    csv()
    .fromFile(filePath)
    .then((jsonObj) => {
        res.send(jsonObj);
    })
    .catch((err) => {
        console.log('get indicators err:', err);
        
    })
});

// POST route to add geography documents
router.post('/indicators', (req, res) => {
    const addData = req.body;
    console.log('new indicators req.body', addData);
    Indicators.create(addData)
        .then( (results) => {
            console.log('indicators POST results ',results);
            res.sendStatus(201);
        })
        .catch( (error) => {
            console.log('indicator POST error', error);
            res.sendStatus(500);
        })
});

module.exports = router;