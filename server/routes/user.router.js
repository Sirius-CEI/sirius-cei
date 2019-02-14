const express = require('express');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');
const encryptLib = require('../auth/encryption');
const Person = require('../models/user.model');
const userStrategy = require('../auth/user-strategy');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // Send back user object from the session (previously queried from the database)
  req.isAuthenticated ? res.send(req.user) : res.send({ username: "", _id: "" })
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/', rejectUnauthenticated, (req, res) => {
	const { username } = req.body
  const password = encryptLib.encryptPassword(req.body.password);

  const newPerson = new Person({ username, password });
  newPerson.save()
    .then(() => res.sendStatus(201))
    .catch((err) => res.json({ success: false, error: err }));
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

// GET route to get a token from user and check if
// the user's reset password time is valid
router.get('/password-reset/:resetPasswordToken', (req, res) => {
  Person.findOne({
		resetPasswordToken: req.params.resetPasswordToken,
		resetPasswordExpires: { $gt: Date.now() }
	}, (err, user) => {
		err ? res.json({ success: false, error: err})
		: user === undefined ? res.json({success: false, error: 'password reset link invalid or expired'})
		: res.sendStatus(200)
	})
});

// post new token and time in user's account
// and sends email to user's email address
// with link the reset password
router.put('/password-reset', (req, res) => {
	const { username } = req.body;
	const token = crypto.randomBytes(20).toString('hex');
	const mailOptions = {
		from: `ceimailtestmn@gmail.com`,
		to: `${username}`,
		subject: `Link To Reset Password`,
		text:
			`You are receiving this e-mail because you  
			have requested a password reset for your account.\n\n` +
			`Please click on the following link, or paste this link into 
			your browser WITHIN ONE HOUR OF RECEIPT OF THIS MESSAGE:\n\n` +
			`http://localhost:3000/reset/${token}/\n\n` +
			`If you did not request this, please ignore this email and 
			your password will remain unchanged.\n`,
	};

  Person.findOneAndUpdate(
    { username },
    { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 1800000 } },
		(error, doc) => (
			error ? res.json({ success: false, error: error.message })
			: doc === null ? res.json({success: false, error: 'user email not in db'})
			: sendMail(mailOptions, res))
	)
});

// PUT route to update user password
router.put('/password', rejectUnauthenticated, (req, res) => {
  const password = encryptLib.encryptPassword(req.body.password);
  Person.findByIdAndUpdate(
    req.user._id,
    { $set: { password } },
  ).then((results) => {
  	res.sendStatus(200);
  })
  .catch((error) => {
    res.json({ success: false, error: error });
  })
});

const sendMail = (mailOptions, res) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_ADDRESS,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	transporter.sendMail(mailOptions, (err, response) => {
		if (err) {
			console.log(err);
			res.json({ success: false, error: err })
		} else {
			res.sendStatus(200);
		}
	});
}

module.exports = router;