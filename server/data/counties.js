const mongoose = require('mongoose');
const County = require('../models/counties.model');
const countyData = require('./counties-geo.json');
const axios = require('axios');

const addCounties = () => {
	axios.post('/api/geo/counties', countyData)
	.then((results) => (console.log(results)))
	.catch((error) => (console.log(error)))
}

module.exports = addCounties;
