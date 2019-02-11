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
router.get('/list', rejectUnauthenticated, (req, res) => {
  Person.find({}).sort({ username: 1 }).exec((err, data) => {
		return err ? res.json({ success: false, error: err }) : res.send(data);
  });
});

//PUT route
router.put('/:id', rejectUnauthenticated, (req, res) => {
  let reqId = req.params.id;
  Person.findByIdAndUpdate( reqId, req.body, {})
    .then( (updatedPerson) => {
      res.sendStatus(200)
    })
    .catch( (error) => {
      res.sendStatus(500)
    })
})

//PUT route to reactivate user
router.put('/reactivate/:id', rejectUnauthenticated, (req, res) => {
  let reqId = req.params.id;
  Person.findByIdAndUpdate({
    _id: reqId}, {$set: {"active": true}})
    .then( (updatedPerson) => {
      res.sendStatus(200)
    })
    .catch( (error) => {
      res.sendStatus(500)
    })
})

//PUT route to deactivate user
router.put('/deactivate/:id', rejectUnauthenticated, (req, res) => {
  let reqId = req.params.id;
  Person.findByIdAndUpdate({
    _id: reqId}, {$set: {"active": false}})
    .then( (updatedPerson) => {
      res.sendStatus(200)
    })
    .catch( (error) => {
      res.sendStatus(500)
    })
})

// DELETE route to remove user
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let reqId = req.params.id;
  Person.findOneAndDelete({
    _id: reqId
  })
    .then( (removedPerson) => {
      res.sendStatus(200)
    })
    .catch( (error) => {
      res.sendStatus(500)
    })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
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
  Person.findOne(
    { resetPasswordToken: req.params.resetPasswordToken },
    {},
    { resetPasswordExpires: { $gt: Date.now(), }, 
  }).then(user => {
    if (user == undefined) {
      res.json('password reset link is invalid or has expired');
    } else {
      res.status(200).send({
        username: req.body.username,
        message: 'password reset link a-ok',
      });
    }
  })
  .catch((error) => {
    res.sendStatus(500)
  });
});

// post new token and time in users account
// and sends email to users email address
// with link the reset password
router.post('/password-reset', (req, res, next) => {
  if (req.body.username === '') {
  }
  const token = crypto.randomBytes(20).toString('hex');
  Person.findOneAndUpdate(
    { username: req.body.username },
    { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 1800000 } },
    (error, doc) => ( error ? res.json({ success: false, error: error.message }) : res.json({ success: true, doc: doc }))
  ).then(user => {
    if (user === null) {
      res.json('email not in db');
    } else {
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


      transporter.sendMail(mailOptions, function(err, response) {
        if (err) {
          alert('there was an error: ', err);
        } else {
          res.status(200).json('recovery email sent');
        }
      });
    }
  })
  .catch( (error) => {
    res.sendStatus(500);
  })
});

// PUT route to update user password
router.put('/new-password', (req, res) => {
  const password = encryptLib.encryptPassword(req.body.password);
  Person.findOneAndUpdate(
    { username: req.body.username },
    { $set: { password: password } },
  ).then((results) => {
  res.sendStatus(200);
  })
  .catch((error) => {
      res.sendStatus(500);
  })
});

// PUT route to update user password
router.put('/new-username', (req, res) => {
  Person.findOneAndUpdate(
    { username: req.body.username },
    { $set: { username: req.body.newUsername } },
  ).then((results) => {
  res.sendStatus(200);
  })
  .catch((error) => {
      res.sendStatus(500);
  })
});

module.exports = router;