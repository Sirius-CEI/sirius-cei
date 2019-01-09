const express = require('express');
const router = express.Router();
const Person = require('../models/user.model');
require('dotenv').config();

const nodemailer = require('nodemailer');
const crypto = require('crypto');

// moved to user.router
//GET route to get a token from user and check if
// the users reset password time is valid
router.get('/:resetPasswordToken', (req, res) => {
  console.log('req.params in forgot password GET', req.params.resetPasswordToken);
  Person.findOne(
    { resetPasswordToken: req.params.resetPasswordToken },
    {},
    { resetPasswordExpires: { $gt: Date.now(), }, 
  }).then(user => {
    console.log('user info: ', user);
    if (user.username == undefined) {
      console.log('password reset link is invalid or has expired');
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

// moved to user.router
// post new token and time in users account
// and sends email to users email address
// with link the reset password
router.post('/', (req, res, next) => {
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
          `http://localhost:3000/#/reset/${token}/\n\n` +
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

module.exports = router;
