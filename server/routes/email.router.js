const express = require('express');
// const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require('nodemailer');

// return all Cards
router.post('/', (req, res) => {
    console.log('in post email router');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'test01012019td@gmail.com',
          pass: 'q1w2e3r4T'
        }
      })
  const mailOptions = {
    from: `Trevor`,
    to: 'trevordammon@gmail.com',
    subject: `Free Mondy`,
    text: `Want to join a Pyramid Scheme?`,
    replyTo: `Trevor`
  }
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res)
    }
  })
})


  module.exports = router;