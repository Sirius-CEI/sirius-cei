const express = require('express');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');
const encryptLib = require('../auth/encryption');
const Person = require('../models/user');
const userStrategy = require('../strategies/user.strategy');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handle Ajax request to get user password reset token
router.get('/reset-password', (req, res) => {
  console.log('req.query in router.get for reset password', req.query);
  Person.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },
    }
  ).then(user => {
    if (user == null) {
      console.log('password reset link is invalid or has expired');
      res.json('password reset link is invalid or has expired');
    } else {
      res.status(200).send({
        username: req.body.username,
        message: 'password reset link a-ok',
      });
    }
  });
});

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

router.put('/password-reset', (req, res) => {
  const token = crypto.randomBytes(20).toString('hex');
  Person.findOneAndUpdate({ username: req.body.username },
    { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 } },
    { new: true },
    (error, doc) => ( error ? res.json({ success: false, error: error.message }) : res.json({ success: true, doc: doc }))
  )
  .then((doc) => {
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
        `You are receiving this e-mail because you (or someone else) 
        has requested a password reset for your account.\n\n` +
        `Please click on the following link or paste it into 
        your browser to complete the process within one hour of receiving this message:\n\n` +
        `http://localhost:3000/#/reset/${token}/\n\n` +
        `If you did not request a password reset, please ignore this e-mail and 
        your password will remain unchanged.\n`,
    };

    console.log('sending mail');

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', response);
        res.status(200).json('recovery email sent');
      }
    });
  })
})

module.exports = router;