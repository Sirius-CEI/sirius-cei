const express = require('express');
const router = express.Router();
const Upload = require('../models/upload.model');
const csv = require('csvtojson');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');

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

//get all csv data
router.get('/all', (req, res) => {
    Upload.find({})
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            console.log(`Error making Card GET query`, error);
            res.sendStatus(500);
        })
});

router.post('/', rejectUnauthenticated, (req, res) => {
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
router.delete('/:date', rejectUnauthenticated, (req, res) => {
	let reqDate = req.params.date;
	console.log('Delete CSV request for id', req.params);
	Upload.deleteMany({
		createdAt: reqDate
	})
		.then( (results) => {
			console.log('documents removed:', results.n);
			res.sendStatus(200)
		})
		.catch( (error) => {
			console.log('delete error', error);
			res.json({ success: false, error: error})
		})
})

module.exports = router;