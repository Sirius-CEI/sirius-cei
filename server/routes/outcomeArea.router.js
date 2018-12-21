const express = require('express');
const router = express.Router();
const OutcomeArea = require('../models/outcome-areas.model');

router.get("/", (req, res) => {
  OutcomeArea.find((err, data) => {
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

module.exports = router;