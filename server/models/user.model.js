const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema
const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
},
{
	timepstamps: true,
	strict: false
});

module.exports = mongoose.model('user', UserSchema);
