const express = require('express');
const router = express.Router();
const OutcomeArea = require('../models/outcome-areas.model');

router.post('/:outcomeId', (req, res) => {
	try {
		const { payload } = req.body;
		OutcomeArea.findByIdAndUpdate(req.params.outcomeId, { $push: { indicators: payload } }, (err, doc) => {
			return err ? res.json({ success: false, error: err })
			: res.json({ success: true, doc: doc })
		})
	} catch (error) {
		console.log(`indicator post error`, error);
		res.json({ success: false, error: error });
	}
})

router.put('/:outcomeId/:indicatorId', (req, res) => {
	try {
		const { payload } = req.body;
		OutcomeArea.find(req.params.outcomeId, (err, doc) => {
			return err ? res.json({ success: false, error: err })
			: res.json({ success: true, doc: doc })
		});
		
	} catch (error) {
		console.log(`outcome put error`, error);
		res.json({ success: false, error: error });
	}
})

module.exports = router;