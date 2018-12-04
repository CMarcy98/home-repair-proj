const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Comment = require('../models/comment');

// Gets all tickets
// localhost:8000/tickets/userId?5324.....
router.get('/', (req, res) => {
	// Variable to hold user Id for later use
	const userId = req.query.userId;
	const ticketStatus = req.query.status;
	console.log('user id:', userId);

	if(userId) {
		// Step 1: Find the user with the given user id
		User.findOne({ _id: userId }, (err, user) => {
			if(err) {
				res.status(200).json('We had an error finding the user');
			} else {
				// We have the user information. Let's try to grab the ticket with the same user info!
				Ticket.find({firstName: user.firstName, lastName: user.lastName}, (err, tickets) => {
					if(!err) {
						res.status(200).json({
							user: user,
							tickets: tickets
						});
					}
				})
			}
		});
		// Step 2: Find the ticket with the same first and last name associated with it.
	} else if(ticketStatus) {
	// Check to see if there are any incoming parameters we need to search for
		const statusCode = req.query.status;
		if(parseInt(statusCode) === 0) {
			console.log('Should be searching for tickets with 0');
			Ticket.find({ status: 0 }, (err, tickets) => {
				res.status(200).json({
					tickets: tickets
				});
			});
		}
	}	else {
		// Retrieves all tickets
		Ticket.find({}, (err, tickets) => {
			if (!err) {
				res.status(200).json({
					tickets: tickets
				});
			}
		});
	}
});


// Gets a specific ticket ticket given its id
router.get('/:ticketId', (req, res) => {
	const id = req.params.ticketId;
	Ticket.findById(id, (err, ticket) => {
		if(!err){
			if(ticket){
				res.status(200).json({
					ticket: ticket

				});
			} else {
				res.status(200).json({
					err: 'There was no ticket found with this id'
				});
			}
		}
	});
});


// Adds comment to specific ticket given the id
router.post('/:ticketId/comments', (req, res) => {
	const id = req.params.ticketId;
	Ticket.findById(id, (err, ticket) => {
		if(err) {
			res.status(200).json({
				err: err
			});
		} else {
			// Creating test comment
			const testComment = {
				author: req.body.author,
				content: req.body.content
			};
			const newComment = new Comment(testComment);

			// Push the new comment onto the ticket object
			ticket.comments.push(newComment);

			// Save it to the ticket object in the db
			ticket.save((err, updatedTicket) => {
				res.status(200).json({
					ticket: updatedTicket
				});
			});
		}
	})
});


// Creates a ticket entity
router.post('/', (req, res) => {
	// Responsible for creating a ticket
	Ticket.create(req.body, (err) => {
		if(!err) {
			res.status(201).json({
				msg: 'Ticket created'
			});
		}
	});
});


// Responsible for updating a specific ticket given its id
router.patch('/:ticketId', (req, res) => {
	const id = req.params.ticketId;
	Ticket.findByIdAndUpdate(id, {status: 1}, (err, ticket) => {
		if(!err) {
			res.status(200).json({
				msg: "Ticket Updated"
			});
		} else {
			res.status(200).json({
				err: err
			});
		}
	});
});



module.exports = router;
