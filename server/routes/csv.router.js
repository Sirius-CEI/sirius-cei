const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// MONGOOSE SCHEMA //

const Schema = mongoose.Schema;

//Schema for geography collection
const indicatorSchema = new Schema({
    geography: { type: Number, required: true},
    year: { type: Number, required: true},
    race: { type: String, required: true},
    value: { type: Number, required: true},
    upload_id: { type: Number, required: true},
    indicator: { type: Number, required: true},
    chart: { type: Number, required: true},
});

const IndicatorData = mongoose.model('data_indicators', indicatorSchema);
router.get('/', (req, res) => {
    console.log('in indicator get server side');
    IndicatorData.find().limit(1).sort({$natural: -1})
        .then((results) => {
            console.log('results', results);
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

// DELETE route to remove a CSV file
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete CSV request for id', req.params);
    IndicatorData.findOneAndDelete({
        _id: reqId
    })
        .then( (removedDocument) => {
            console.log('delete results', removedDocument);
            res.sendStatus(200)
        })
        .catch( (error) => {
            console.log('delete error', error);
            res.sendStatus(500)
        })
}) 

module.exports = router;