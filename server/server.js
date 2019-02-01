
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./auth/session-middleware');
const passport = require('./auth/user-strategy');
require('./modules/database');

// Route includes
const userRouter = require('./routes/user.router');
const cardRouter = require('./routes/cards.router');
const outcomeAreaRouter = require('./routes/outcomeArea.router');
const indicatorRouter = require('./routes/indicator.router');
const chartRouter = require('./routes/charts.router');
const geoRouter = require('./routes/geo.router');
const csvRouter = require('./routes/csv.router');

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
app.use('/api/cards', cardRouter);
app.use('/api/outcome-areas', outcomeAreaRouter);
app.use('/api/indicators', indicatorRouter);
app.use('/api/charts', chartRouter);
app.use('/api/geo', geoRouter);
app.use('/api/csv', csvRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
});
