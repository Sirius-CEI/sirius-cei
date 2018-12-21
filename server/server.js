
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./auth/session-middleware');
const passport = require('./strategies/user.strategy');
require('./auth/database');

// Route includes
const adminRouter = require('./routes/admin.router');
const cardRouter = require('./routes/cards.router');
const releaseRouter = require('./routes/release.router');
const csvRouter = require('./routes/csv.router');
const recoverPasswordRouter = require('./routes/forgotPassword.router');

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
app.use('/annual-release', releaseRouter);
app.use('/data-indicators', csvRouter);
app.use('/forgot-password', recoverPasswordRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
