const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const csv = require('csvtojson');
const path = require('path');

// MONGOOSE SCHEMA //

const Schema = mongoose.Schema;

//Schema for geography collection
const geographySchema = new Schema({
    geography: { type: String, required: true},
    label: { type: String, required: true},
    geo_level: { type: String, required: true},
    source: { type: String, default: 'https://lehd.ces.census.gov/data/schema/latest/label_geography.csv'},
});

const Geography = mongoose.model('geographies', geographySchema);

// Get geographies from csv files
router.get('/geographies', (req, res) => {
    let filePath = path.join(__dirname, '../constants/geographies.csv');
    csv()
    .fromFile(filePath)
    .then((jsonObj) => {
        res.send(jsonObj);
    })
    .catch((err) => {
        console.log('get geographies err:', err);
        
    })
});

// POST route to add geography documents
router.post('/geographies', (req, res) => {
    const addData = req.body;
    console.log('new data req.body', addData);
    Geography.create(addData)
        .then( (results) => {
            console.log('data POST results ',results);
            res.sendStatus(201);
        })
        .catch( (error) => {
            console.log('Card POST error', error);
            res.sendStatus(500);
        })
});

module.exports = router;