const express = require('express');
const router = express.Router();
const Upload = require('../models/upload.model');

router.get('/', (req, res) => {
	Upload.find().sort({createdAt: -1, $natural: -1})
		.then((results) => {
			// console.log('results', results);
			res.send(results);
		})
		.catch((error) => {
			console.log(`Error making Upload GET query`, error);
			res.json({ success: false, error: error });
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

router.post('/', (req, res) => {
	// console.log('post router', req.body);
	const { payload, fileInfo} = req.body;
	const test = payload.map((item) => Object.assign({fileInfo: fileInfo}, item))
	console.log('test', test);
	Upload.create(test)
		.then( (results) => {
			console.log('csv POST results ', results);
			res.sendStatus(201);
		})
		.catch( (error) => {
			console.log('csv POST error', error);
			res.sendStatus(500);
		})
});

// DELETE route to remove a CSV file
router.delete('/:date', (req, res) => {
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