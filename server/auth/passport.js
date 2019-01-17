const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId, (error, user) => done(error, user))
});

// Does actual work of logging in
passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'username',
}, ((username, password, done) => {
    User.findOne({ username })
      .then((user) => {
        if( !user || !user.validPassword(password) ){
          done(null, false, {message: 'invalid username or password'});
        } else {
          done(null, user);
        } 
  })
  .catch(e => done(e));
}))); 

module.exports = passport;
