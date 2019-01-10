const express = require('express');
const router = express.Router();
const County = require('../models/counties.model');
const Tract = require('../models/tracts.model');

router.get('/counties', (req, res) => {
	County.find({})
	.exec((err, data) => {
		return err ? res.json({ success: false, error: err }) : res.send(data);
  });
});

router.get('/tracts', (req, res) => {
	Tract.find({})
	.exec((err, data) => {
		return err ? res.json({ success: false, error: err }) : res.send(data);
  });
});

module.exports = router;