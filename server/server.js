
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

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
const userRouter = require('./routes/user.router');
const cardRouter = require('./routes/cards.router');
const passwordRouter = require('./routes/password.router');
const releaseRouter = require('./routes/release.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/cards', cardRouter);
app.use('/password', passwordRouter);
app.use('/annual-release', releaseRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
