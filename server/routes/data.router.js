const express = require('express');
const router = express.Router();
const Upload = require('../models/upload.model');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');

//get uploaded data
router.get('/', (req, res) => {
	Upload.find({}).sort({ '_id' : -1 })
		.then((results) => {
			let uuidList = results.map((item) => item.fileInfo.uuid);
			uuidList = [...new Set(uuidList)]
			res.send(uuidList)
		})
		.catch((error) => {
				res.sendStatus(500);
		})
});

router.post('/', rejectUnauthenticated, (req, res) => {
	const { payload, fileInfo } = req.body;
	const test = payload.map((item) => Object.assign({fileInfo: fileInfo}, item));
	Upload.create(test)
		.then( (results) => {
			res.sendStatus(201);
		})
		.catch( (error) => {
			res.sendStatus(500);
		})
});

// DELETE route to remove a CSV file
router.delete('/data/:uuid', rejectUnauthenticated, (req, res) => {
	let uuid = req.params.uuid;
	Upload.deleteMany({'fileInfo.uuid': uuid})
	.then((results) => {
			res.sendStatus(200)
		})
		.catch( (error) => {
			res.json({ success: false, error: error})
		})
})

module.exports = router;