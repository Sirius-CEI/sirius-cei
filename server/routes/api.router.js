const express = require('express');
const router = express.Router();
const Card = require('../models/cards.model');
const User = require('../models/user.model');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');

const modelList = {
	'/api/cards': Card,
	'/api/users': User
}

//GET route to get Cards from database
router.get('/', (req, res) => {
	try {
		const myModel = modelList[req.originalUrl];
		myModel.find({}).sort({ _id: 1 })
		.exec((err,docs) => err ? res.json({ success: false, error: err }) : res.send(docs))
	} catch (error) {
		res.json({ success: false, error: error })
	}
});

//GET route to get a single Card from database
router.get('/:id', (req, res) => {
	try {
		const { id } = req.params;
		const myModel = modelList[req.baseUrl];
		myModel.findById(id)
		.exec((err, doc) => err ? res.json({ success: false, error: err }) : res.send(doc))
	} catch (e) {
		res.json({ success: false, error: e })
	}
});


//POST route to add Card to database
router.post('/', rejectUnauthenticated, (req, res) => {
	try {
		console.log(req);
		const payload = req.body;
		const myModel = modelList[req.originalUrl]
		const newItem = new myModel();
		Object.entries(payload).forEach(
			([key, value]) => newItem[key] = value
		);
		newItem.save((err) => err ? res.json({ success: false, error: err })
			: res.sendStatus(201)
		);
	} catch (error) {
		res.json({ success: false, error: error });
	}
});

// PUT route to edit card
router.put('/:id', rejectUnauthenticated, (req, res) => {
	try {
		const data = req.body;
		const { id } = req.params;
		const myModel = modelList[req.baseUrl]
		myModel.findByIdAndUpdate(id, data, (err, doc) => {
			console.log(doc);
			return err ? res.json({ success: false, error: err }) : res.sendStatus(200)
		})
	} catch (error) {
		res.json({ success: false, error: error });
	}
})

// DELETE route to remove a card
router.delete('/:id', rejectUnauthenticated, (req, res) => {
		const { id }  = req.params;
		console.log(req.baseUrl);
		const myModel = modelList[req.baseUrl]
		myModel.findByIdAndDelete(id, (err, doc) => {
			return err ? res.json({ success: false, error: err }) : res.sendStatus(200)
		})
})

module.exports = router;