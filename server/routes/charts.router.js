const express = require('express');
const router = express.Router();
const Chart = require('../models/charts.model');

router.get('/:indicator', (req, res) => {
	Chart
	.find({ indicator: req.params.indicator })
	.sort({ active: -1, order: 1, title: 1, _v: -1, _id: 1 })
	.exec((err, data) => {
		return err ? res.json({ success: false, error: err }) : res.send(data);
  });
});

router.post('/', (req, res) => {
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
			: res.status(201).json({ success: true, objectId: data._id });
		});
	} catch (error) {
		console.log(`chart post error`, error);
		res.json({ success: false, error: error });
	}
});

router.put('/:id', (req, res) => {
	try {
		const { payload } = req.body;
		Chart.findByIdAndUpdate(req.params.id, payload, (err, doc) => {
			return err ? res.json({ success: false, error: err })
			: res.json({ success: true, doc: doc })
		})
	} catch (error) {
		console.log(`chart put error`, error);
		res.json({ success: false, error: error})
	}
})

module.exports = router;