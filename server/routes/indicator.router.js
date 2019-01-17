const express = require('express');
const router = express.Router();
const Indicator = require('../models/indicators.model');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');

router.get('/', (req, res) => {
	Indicator
	.find({})
	.sort({ active: -1, order: 1, createdAt: 1 })
	.exec((err, data) => {
		return err ? res.json({ success: false, error: err }) : res.send(data);
  });
});

router.post('/', rejectUnauthenticated, (req, res) => {
	try {
		const { payload } = req.body;
		let indicator = new Indicator();
		// set document fields equal to the value of the matching payload key
		Object.entries(payload).forEach(
			([key, value]) => indicator[key] = value
		);
		indicator.save((err, data) => {
			return err ? res.json({ success: false, error: err })
			: res.sendStatus(201);
		});
	} catch (error) {
		res.json({ success: false, error: error });
	}
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
	try {
		const { payload } = req.body;
		Indicator.findByIdAndUpdate(req.params.id, { $set: payload }, (err, doc) => {
			return err ? res.json({ success: false, error: err })
			: res.sendStatus(200);
		})
	} catch (error) {
		res.json({ success: false, error: error });
	}
})

module.exports = router;