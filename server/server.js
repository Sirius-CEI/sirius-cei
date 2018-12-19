
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./auth/session-middleware');
const passport = require('./auth/passport');

/** ---------- MONGOOSE CONNECTION ---------- **/
const databaseUrl = 'mongodb://localhost:27017/cei'
mongoose.connect(databaseUrl, {useNewUrlParser: true});

mongoose.connection.once('connected', () => {
    console.log('mongoose is connected to:', databaseUrl);
});

mongoose.connection.on('error', (error) => {
    console.log('mongoose connection error:', error);
});

// Route includes
const adminRouter = require('./routes/admin.router');
const cardRouter = require('./routes/cards.router');
const releaseRouter = require('./routes/release.router');
const qwiRouter = require('./routes/csv.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', adminRouter);
app.use('/cards', cardRouter);
// app.use('/password', passwordRouter);
app.use('/annual-release', releaseRouter);
app.use('/qwi', qwiRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
