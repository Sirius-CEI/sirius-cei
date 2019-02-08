const express = require('express');
const router = express.Router();
const Chart = require('../models/charts.model');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');

router.get('/', (req, res) => {
	Chart
	.find({})
	.sort({ active: -1, type: 1, createdAt: 1 })
	.exec((err, data) => {
		return err ? res.json({ success: false, error: err }) : res.send(data);
  });
});

router.post('/', rejectUnauthenticated, (req, res) => {
	try {
		const { payload } = req.body;
		let chart = new Chart();
		// set document fields equal to the value of the matching payload key
		Object.entries(payload).forEach(
			([key, value]) => chart[key] = value
		);
		chart.save((err, data) => {
			return err ? res.json({ success: false, error: err })
			: res.sendStatus(201);
		});
	} catch (error) {
		res.json({ success: false, error: error });
	}
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
	try {
		const { payload } = req.body;
		Chart.findByIdAndUpdate(req.params.id, { $set: payload }, (err, doc) => {
			return err ? res.json({ success: false, error: err })
			: res.sendStatus(200);
		})
	} catch (error) {
		res.json({ success: false, error: error})
	}
})

module.exports = router;