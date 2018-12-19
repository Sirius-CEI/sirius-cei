const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const csv = require('csvtojson');
const path = require('path');

// MONGOOSE SCHEMA //

const Schema = mongoose.Schema;

//Schema for geography collection
const indicatorSchema = new Schema({
    data: { type: String, required: true},
    hello: { type: String, required: true},
});

const IndicatorData = mongoose.model('data_indicators', indicatorSchema);

// Get geographies from csv files
// router.get('/data-indicators', (req, res) => {
//     let filePath = path.join(__dirname, '../constants/data_indicators.csv');
//     csv()
//     .fromFile(filePath)
//     .then((jsonObj) => {
//         res.send(jsonObj);
//     })
//     .catch((err) => {
//         console.log('get data_indicators err:', err);
        
//     })
// });

router.get('/', (req, res) => {
    console.log('in indicator get server side');
    IndicatorData.find({})
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            console.log(`Error making IndicatorData GET query`, error);
            res.sendStatus(500);
        })
});

// POST route to add geography documents
router.post('/', (req, res) => {
    const addData = req.body;
    console.log('new data_indicators req.body', addData);
    IndicatorData.create(addData)
        .then( (results) => {
            console.log('data_indicators POST results ',results);
            res.sendStatus(201);
        })
        .catch( (error) => {
            console.log('data_indicators POST error', error);
            res.sendStatus(500);
        })
});

module.exports = router;