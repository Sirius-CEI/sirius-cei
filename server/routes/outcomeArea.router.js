const express = require('express');
const router = express.Router();
const OutcomeArea = require('../models/outcome-areas.model');

router.post("/", (req, res) => {
	console.log(`in post router`, req.body);
	const { payload } = req.body;
	let outcomeArea = new OutcomeArea();
	outcomeArea.title = payload.title;
	outcomeArea.copy = payload.copy;
  outcomeArea.save(err => {
		return err ? res.json({ success: false, error: err }) : res.json({ success: true });
  });
});

module.exports = router;