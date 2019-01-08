const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
});

module.exports = mongoose.model('user', UserSchema);