const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	phoneNumber: String,
	address: String,
	city: String,
	state: String,
	zipCode: String
});

module.exports = mongoose.model("User", UserSchema);