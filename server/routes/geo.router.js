const express = require('express');
const router = express.Router();
const County = require('../models/counties.model');
const Tracts = require('../models/tracts.model');
const countyData = require('../data/counties-geo.json');
const tractsData = require('../data/tracts-geo.json');

router.post('/counties', (req, res) => {
	County.insertMany(countyData)
	.then((docs) => (res.json({ success: true, docs: docs.length })))
	.catch((err) => (res.json({ success: false, error: err.message })))
});

router.post('/tracts', (req, res) => {
	Tracts.insertMany(tractsData, { ordered: false })
	.then((docs) => (res.json({ success: true, docs: docs.length })))
	.catch((err) => (res.json({ success: false, error: err.message })))
});

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