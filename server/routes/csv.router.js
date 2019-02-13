const express = require('express');
const router = express.Router();
const Upload = require('../models/upload.model');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');

//get csv data
router.get('/', (req, res) => {
	Upload.find({}).sort({ _id : 1 })
	.select('fileInfo.filename fileInfo.user_id fileInfo uuid fileInfo.uploadTs')
		.then((results) => {
			res.send(results)
		})
		.catch((error) => {
			res.json({ success: false, error: error })
		})
});

router.post('/', rejectUnauthenticated, (req, res) => {
	const { payload, fileInfo } = req.body;
	const createDoc = payload.map((item) => Object.assign({fileInfo: fileInfo}, item));
	Upload.create(createDoc)
		.then( (results) => {
			res.sendStatus(201);
		})
		.catch( (error) => {
			res.json({ success: false, error: error })
		})
});

// DELETE route to remove a CSV file
router.delete('/:uuid', rejectUnauthenticated, (req, res) => {
	let uuid = req.params.uuid;
	Upload.deleteMany({'fileInfo.uuid': uuid})
	.then((results) => {
			res.sendStatus(200)
		})
		.catch( (error) => {
			res.json({ success: false, error: error })
		})
})

module.exports = router;