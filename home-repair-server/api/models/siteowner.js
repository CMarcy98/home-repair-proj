const mongoose = require('mongoose');


const SiteOwnerSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String
});

module.exports = mongoose.model("SiteOwner", SiteOwnerSchema);
