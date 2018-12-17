const mongoose = require('mongoose');
const increment = require('mongoose-auto-increment');

// Initializes connection to db to allow auto increment to work
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
const connection = mongoose.createConnection("mongodb://localhost/home-repair");
increment.initialize(connection);

// Added to accommodate the need for comments
const commentSchema = new mongoose.Schema({
	author: String,
	content: String,
	timestamp: { type: Date, default: Date.now }
});


// Schema of a work ticket
const TicketSchema = new mongoose.Schema({
	TicketId: Number,	//this will be the auto increment
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	address: String,
	city: String,
	state: String,
	zipCode: String,
	service: String,
	description: String,
	status: {
		type: Number,
		default: 0
	},
	comments: [commentSchema]
});

// Allows us to use the plugin to increment the number of tickets
TicketSchema.plugin(increment.plugin, 'Ticket');
const Ticket = connection.model('Ticket',TicketSchema);

module.exports = mongoose.model("Ticket", TicketSchema);