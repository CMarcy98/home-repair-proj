const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	businessName: String,
	businessPhone: String,
	address: String,
	city: String,
	state: String,
	zipCode: String
});

module.exports = mongoose.model("Provider", ProviderSchema);