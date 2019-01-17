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
	console.log('Mongo connected', mongoURI);
	checkForUser();
});

mongoose.connection.on('error', (err) => {
  console.log('Error on mongoose connection: ', err);
});

const checkForUser = () => {
	User.countDocuments({}, (err, count) => {
		console.log('there are %d users', count);
		if (count === 0) {
			const username = 'admin';
			const password = encryptLib.encryptPassword('password');
			const newPerson = new User({ username, password });
			newPerson.save()
				.then(() => { console.log(`Success adding admin user.`)})
				.catch((err) => { console.log(`Error adding admin user:`, err)})
			}
		})
}