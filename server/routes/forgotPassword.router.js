const express = require('express');
const router = express.Router();
const Person = require('../models/user');
// import crypto from 'crypto';
require('dotenv').config();

const nodemailer = require('nodemailer');

//GET route to get a username from database
router.get('/', (req, res) => {
    console.log('req.params', req.params);
    const userId = req.params;
    Person.findOne({userId})
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            console.log(`Error making userId GET query`, error);
            res.sendStatus(500);
        })
});

  router.post('/', (req, res, next) => {
    console.log('in router.post forgot password', req.body.username);
    if (req.body.username === '') {
      res.json('email required');
    }
    console.log(req.body.username);
    Person.findOne({
      where: {
        email: req.body.username,
      },
    }).then(users => {
      if (users === null) {
        console.log('email not in database');
        res.json('email not in db');
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        Person.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 360000,
        });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          },
        });

        const mailOptions = {
          from: `ceimailtestmn@gmail.com`,
          to: `${user.email}`,
          subject: `Link To Reset Password`,
          text:
            `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
            `http://localhost:3031/reset/${token}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
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
    });
  });

module.exports = router;
