const express = require('express');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');
const encryptLib = require('../auth/encryption');
const Person = require('../models/user.model');
const userStrategy = require('../auth/user-strategy');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Get all users
// TODO: rejectUnauthenticated
router.get('/list', (req, res) => {
  Person.find({}).sort({ username: 1 }).exec((err, data) => {
		return err ? res.json({ success: false, error: err }) : res.send(data);
  });
});

//PUT route to reactivate user
router.put('/reactivate/:id', (req, res) => {
  console.log('in router reactivate user',  req.params.id);
  let reqId = req.params.id;
  Person.findByIdAndUpdate({
    _id: reqId}, {$set: {"active": true}})
    .then( (updatedPerson) => {
      console.log('updated result', updatedPerson);
      res.sendStatus(200)
    })
    .catch( (error) => {
      console.log('updating error');
      res.sendStatus(500)
    })
})

//PUT route to deactivate user
router.put('/deactivate/:id', (req, res) => {
  console.log('in router deactivate user',  req.params.id);
  let reqId = req.params.id;
  Person.findByIdAndUpdate({
    _id: reqId}, {$set: {"active": false}})
    .then( (updatedPerson) => {
      console.log('updated result', updatedPerson);
      res.sendStatus(200)
    })
    .catch( (error) => {
      console.log('updating error');
      res.sendStatus(500)
    })
})

// DELETE route to remove user
router.delete('/:id', (req, res) => {
  console.log('in router delete user', req.params.id);
  let reqId = req.params.id;
  Person.findOneAndDelete({
    _id: reqId
  })
    .then( (removedPerson) => {
      console.log('delete result', removedPerson);
      res.sendStatus(200)
    })
    .catch( (error) => {
      console.log('delete error');
      res.sendStatus(500)
    })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
	console.log(`in api/user/register router`, req.body);
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const newPerson = new Person({ username, password });
  newPerson.save()
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//GET route to get a token from user and check if
// the users reset password time is valid
router.get('/password-reset/:resetPasswordToken', (req, res) => {
  console.log('req.params in forgot password GET', req.params.resetPasswordToken);
  Person.findOne(
    { resetPasswordToken: req.params.resetPasswordToken },
    {},
    { resetPasswordExpires: { $gt: Date.now(), }, 
  }).then(user => {
    console.log('user info: ', user);
    if (user == undefined) {
      console.log('password reset link is invalid or has expired', req.body.username);
      res.json('password reset link is invalid or has expired');
    } else {
      res.status(200).send({
        username: req.body.username,
        message: 'password reset link a-ok',
      });
    }
  })
  .catch((error) => {
    console.log('error', error);
    res.sendStatus(500)
  });
});

// post new token and time in users account
// and sends email to users email address
// with link the reset password
router.post('/password-reset', (req, res, next) => {
  console.log('in router.post forgot password', req.body.username);
  if (req.body.username === '') {
    console.log('email required');
  }
  const token = crypto.randomBytes(20).toString('hex');
  console.log(req.body.username);
  Person.findOneAndUpdate(
    { username: req.body.username },
    { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 1800000 } },
    (error, doc) => ( error ? res.json({ success: false, error: error.message }) : res.json({ success: true, doc: doc }))
  ).then(user => {
    console.log('users here ', user);
    if (user === null) {
      console.log('email not in database');
      res.json('email not in db');
    } else {
      console.log('post users update', user);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
        from: `ceimailtestmn@gmail.com`,
        to: `${req.body.username}`,
        subject: `Link To Reset Password`,
        text:
          `You are receiving this because you (or someone else) 
          have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into 
          your browser to complete the process within one hour of receiving it:\n\n` +
          `http://localhost:3000/reset/${token}/\n\n` +
          `If you did not request this, please ignore this email and 
          your password will remain unchanged.\n`,
      };

      console.log('sending mail');

      transporter.sendMail(mailOptions, function(err, response) {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('recovery email sent');
        }
      });
    }
  })
  .catch( (error) => {
    console.log('error', error);
    res.sendStatus(500);
  })
});

// PUT route to update user password
router.put('/new-password/:username', (req, res) => {
  const password = encryptLib.encryptPassword(req.body.password);
  console.log('update password:', password);
  console.log('update password username:', req.body.username);
  Person.findOneAndUpdate(
    { username: req.body.username },
    { $set: { password: password } },
  ).then((results) => {
  console.log(`Success updating password`, results);
  res.sendStatus(200);
  })
  .catch((error) => {
      console.log(`Error making database password UPDATE`, error);
      res.sendStatus(500);
  })
});

module.exports = router;