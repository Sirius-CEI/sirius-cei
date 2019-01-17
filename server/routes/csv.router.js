const express = require('express');
const router = express.Router();
const Upload = require('../models/upload.model');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');

//get all csv data
router.get('/', (req, res) => {
	Upload.find({}).sort({ '_id' : -1 })
		.then((results) => {
			let uuidList = results.map((item) => item.fileInfo.uuid);
			uuidList = [...new Set(uuidList)]
			let arr = [];
			// let fileList = results.map((item) => ({ 
			// 	filename: item.fileInfo.filename,
			// 	uuid: item.fileInfo.uuid,
			// 	uploadTs: item.fileInfo.uploadTs
			// }))
			// fileList = [ ...new Set(fileList)];
			res.send(uuidList)
		})
		.catch((error) => {
				console.log(`Error making csv GET query`, error);
				res.sendStatus(500);
		})
});

router.post('/', rejectUnauthenticated, (req, res) => {
	console.log('post router', req.body);
	const { payload, fileInfo } = req.body;
	const test = payload.map((item) => Object.assign({fileInfo: fileInfo}, item));
	// console.log(test);
	Upload.create(test)
		.then( (results) => {
			// console.log('csv POST results ',results);
			res.sendStatus(201);
		})
		.catch( (error) => {
			console.log('csv POST error', error);
			res.sendStatus(500);
		})
});

// DELETE route to remove a CSV file
router.delete('/:uuid', rejectUnauthenticated, (req, res) => {
	let uuid = req.params.uuid;
	console.log('Delete CSV request for id', uuid);
	Upload.deleteMany({'fileInfo.uuid': uuid})
	// , (error, results) => console.log(results))
	.then((results) => {
			// console.log('documents found:', results);

			res.sendStatus(200)
		})
		.catch( (error) => {
			console.log('delete error', error);
			res.json({ success: false, error: error})
		})
})

module.exports = router;