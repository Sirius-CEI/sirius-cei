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
		Object.entries(payload).forEach(
			([key, value]) => outcomeArea[key] = value
		);
		outcomeArea.save((err, data) => {
			return err ? res.json({ success: false, error: err })
			: res.status(201).json({ success: true, objectId: data._id });
		});
	} catch (err) {
		console.log(`outcome area post error`, error);
		res.json({ success: false, error: err });
	}
	
});

module.exports = router;