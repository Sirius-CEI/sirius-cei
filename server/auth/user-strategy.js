const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('./encryption');
const Person = require('../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Person.findById(id).then((result) => {
    // Handle Errors
    const user = result;

    if (!user) {
      // user not found
      done(null, false, { message: 'Incorrect credentials.' });
    } else {
      // user found
      const userInfo = {
        username: user.username,
        _id: user._id,
      };      
      done(null, userInfo);
    }
  }).catch((err) => {
    done(err);
  });
});

// Does actual work of logging in
passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'username',
}, ((req, username, password, done) => {
    Person.find({ username })
      .then((result) => {
        const user = result && result[0];
        if (user && user.active && encryptLib.comparePassword(password, user.password)) {
          // all good! Passwords match and user is active!
          done(null, user);
        } else if (user) {
          // not good! Passwords don't match!
          done(null, false, { message: 'Incorrect credentials.' });
        } else {
          // not good! No user with that name
          done(null, false, { message: 'Username does not exist.'});
        }
      }).catch((err) => {
        done(null, { message: err });
      });
  })));

module.exports = passport;