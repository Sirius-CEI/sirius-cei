const express = require('express');
const router = express.Router();
const Upload = require('../models/upload.model');
const csv = require('csvtojson');

router.get('/', (req, res) => {
    console.log('in indicator get server side');
    Upload.find().limit(1).sort({$natural: -1})
        .then((results) => {
            console.log('results', results);
            res.send(results);
        })
        .catch((error) => {
            console.log(`Error making Upload GET query`, error);
            res.sendStatus(500);
        })
});

router.post('/', (req, res) => {
    console.log('post router', req.body);
    const addData = req.body;
    console.log('new data_indicators req.body', addData);
    Upload.create(addData)
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
    Upload.findOneAndDelete({
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