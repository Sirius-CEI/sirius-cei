/* the only line you likely need to change is
 mongoURI = 'mongodb://localhost:27017/prime_app';
 change `prime_app` to the name of your database, and you should be all set!
*/

const mongoose = require('mongoose');

/* Mongo Connection */
let mongoURI = '';

// process.env.MONGODB_URI will only be defined if you are running on Heroku
if (process.env.MONGODB_URI) {
  // Heroku will provide this when deployed
  // use the string value of the environment variable
  mongoURI = process.env.MONGODB_URI;
} else {
  // use the mlab database server
  mongoURI = 'mongodb://cei:cei359@ds159926.mlab.com:59926/heroku_f0j74zsg';
}

mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
  console.log('Mongo connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Error on mongoose connection: ', err);
});