const express = require('express');
const router = express.Router();
const OutcomeArea = require('../models/outcome-areas.model');

router.get('/', (req, res) => {
  OutcomeArea.find({}).sort({ active: -1, order: 1, title: 1, _v: -1, _id: 1 }).exec((err, data) => {
		return err ? res.json({ success: false, error: err }) : res.send(data);
  });
});

router.post('/', (req, res) => {
	try {
		const { payload } = req.body;
		let outcomeArea = new OutcomeArea();
		// set document fields equal to the value of the matching payload key
		Object.entries(payload).forEach(
			([key, value]) => outcomeArea[key] = value
		);
		// set route by changing spaces to dashes and removing special characters
		let route = payload.title.replace(/\s/g, '_');
		route = route.replace(/\W/g, '').replace(/[_]/g, '-').toLowerCase();
		while(route.includes('--')) {
			route = route.replace('--', '-')
		}
		outcomeArea.route = `/${route}`;
		outcomeArea.save((err, data) => {
			return err ? res.json({ success: false, error: err })
			: res.status(201).json({ success: true, objectId: data._id });
		});
	} catch (error) {
		console.log(`outcome area post error`, error);
		res.json({ success: false, error: error });
	}
});

router.put('/:id', (req, res) => {
	try {
		const { payload } = req.body;
		OutcomeArea.findByIdAndUpdate(req.params.id, { $set: payload }, (err, doc) => {
			return err ? res.json({ success: false, error: err })
			: res.json({ success: true, doc: doc })
		})
	} catch (error) {
		console.log(`outcome put error`, error);
		res.json({ success: false, error: error });
	}
})

module.exports = router;