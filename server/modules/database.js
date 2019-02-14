require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const encryptLib = require('../auth/encryption');

/* Mongo Connection */
let mongoURI = '';

// process.env.MONGODB_URI will only be defined if you are running on Heroku
if (process.env.MONGODB_URI) {
  // Heroku will provide this when deployed
  // use the string value of the environment variable
  mongoURI = process.env.MONGODB_URI;
} else {
  // use the local database server
  mongoURI = 'mongodb://localhost:27017/cei';
}

mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
	console.log(`Connected to database ${mongoURI}.`)
	checkForUser();
});

mongoose.connection.on('error', (err) => {
	console.log(`Mongo connection error.`, err);
});

const checkForUser = () => {
	const username = 'admin@cei.org';
	const password = encryptLib.encryptPassword('password');
	User.findOne({ username }, (err, doc) => {
		if (doc === null) {
			const newPerson = new User({ username, password });
			newPerson.save();
		}
	})
}