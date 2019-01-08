<<<<<<< HEAD
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
 username: { type: String, required: true, unique: true },
 passwordHash: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual("password").set(function(value) {
 this.passwordHash = bcrypt.hashSync(value, 12);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema
const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
},
{
	timepstamps: true,
});

module.exports = mongoose.model('user', UserSchema);
>>>>>>> a13a45a1103a385f3065daef5f969e0d1e440c41
