const express = require('express');
const router = express.Router();
const Chart = require('../models/charts.model');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');

router.get('/', (req, res) => {
	Chart
	.find({})
	.sort({ active: -1, order: 1, createdAt: 1 })
	.exec((err, data) => {
		return err ? res.json({ success: false, error: err }) : res.send(data);
  });
});

router.post('/', rejectUnauthenticated, (req, res) => {
	try {
		const { payload } = req.body;
		console.log(`post chart payload:`, payload);
		let chart = new Chart();
		// set document fields equal to the value of the matching payload key
		Object.entries(payload).forEach(
			([key, value]) => chart[key] = value
		);
		console.log(`chart:`, chart);
		chart.save((err, data) => {
			return err ? res.json({ success: false, error: err })
			: res.sendStatus(201);
		});
	} catch (error) {
		console.log(`chart post error`, error);
		res.json({ success: false, error: error });
	}
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
	try {
		const { payload } = req.body;
		// console.log(payload);
		Chart.findByIdAndUpdate(req.params.id, { $set: payload }, (err, doc) => {
			return err ? res.json({ success: false, error: err })
			: res.sendStatus(200);
		})
	} catch (error) {
		console.log(`chart put error`, error);
		res.json({ success: false, error: error})
	}
})

module.exports = router;