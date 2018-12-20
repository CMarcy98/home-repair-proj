const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const Provider = require('../models/provider');
const User = require('../models/user');
const Comment = require('../models/comment');

// Gets all tickets
// localhost:8000/tickets/userId?5324.....
router.get('/', (req, res) => {
	// Variable to hold user Id for later use
	const userId = req.query.userId;
	const provId = req.query.provId;
	const ticketStatus = Number(req.query.status);
	const ticketType = req.query.type;
	const firstName = req.query.firstName;
	const description = req.query.description;

	// We want information for these specific endpoints:
	// 1. A provider that provides a certain type of service that is open status
	// 2. A provider that provides a certain type of service regardless of status (open and closed)
	// 3. Maybe we want provider closed tickets
	// 4. Maybe we can provide categories for site owner here as well
	let queryObj = {};


	// Second case: Provider wants open or closed tickets
	if(ticketStatus === 0 || ticketStatus === 1) {
		queryObj.status = ticketStatus;
	}

	// Add case to find tickets with specific user
	if(firstName) {
		queryObj.firstName = firstName;
	}

	// Add case to find tickets with specific description
	if(description) {
		queryObj.description = description;
	}


	// Grab specific kind of tickets
	if(ticketType) {
		queryObj.service = ticketType;
	}


	if(userId) {
		// We need to find the users info before we can grab the ticket...
		User.find({ _id: userId }, (err, user) => {
			if(!err) {
				// Add user service type to query
				// We have the user information. Let's try to grab the ticket with the same user info!
				const firstName = `^${user[0].firstName}$`;
				const lastName = `^${user[0].lastName}$`;

				queryObj.firstName = {'$regex': firstName, $options: 'i'};
				queryObj.lastName = {'$regex': lastName, $options: 'i'};

				// // Instead we need to add first name and last name to query object so we do not lose info...
				// queryObj.firstName = {$regex: new RegExp(firstName, "i") };
				// queryObj.lastName = {$regex: new RegExp(lastName, "i") };

				console.log('Query obj:', queryObj);

				Ticket.find(queryObj, (err, tickets) => {
					if(!err) {
						res.status(200).json({
							tickets: tickets
						});
					}
				})
			}
		});

	} else if(provId) {
		// Specific case where we want to only give tickets of the providers type back
		Provider.find({ _id: provId }, (err, provider) => {
			if(!err) {
				queryObj.service = provider[0].service;
				Ticket.find(queryObj, (error, tickets) => {
					if(!error) {
						res.status(200).json({
							tickets: tickets
						});
					}
				})
			}
		});
	} else {
		Ticket.find(queryObj, (err, tickets) => {
			if(err) {
				res.status(200).json({
					err: err
				});
			} else {
				res.status(200).json({
					tickets: tickets
				});
			}
		});
	}






	// if(userId) {
	// 	// Step 1: Find the user with the given user id
	// 	User.findOne({ _id: userId }, (err, user) => {
	// 		if(err) {
	// 			res.status(200).json('We had an error finding the user');
	// 		} else {
	// 			// We have the user information. Let's try to grab the ticket with the same user info!
	// 			Ticket.find({firstName: user.firstName, lastName: user.lastName}, (err, tickets) => {
	// 				if(!err) {
	// 					res.status(200).json({
	// 						user: user,
	// 						tickets: tickets
	// 					});
	// 				}
	// 			})
	// 		}
	// 	});
	// 	// Step 2: Find the ticket with the same first and last name associated with it.
	// } else if(ticketStatus) {
	// // Check to see if there are any incoming parameters we need to search for
	// 	const statusCode = req.query.status;
	// 	if(parseInt(statusCode) === 0) {
	// 		console.log('Should be searching for tickets with 0');
	// 		Ticket.find({ status: 0 }, (err, tickets) => {
	// 			res.status(200).json({
	// 				tickets: tickets
	// 			});
	// 		});
	// 	}
	// }	else if(ticketType) {
	// 	// Retrieves all tickets
	// 	Ticket.find({ service: ticketType }, (err, tickets) => {
	// 		if (!err) {
	// 			res.status(200).json({
	// 				tickets: tickets
	// 			});
	// 		}
	// 	});
	// }	else {
	// 	// Retrieves all tickets
	// 	Ticket.find({}, (err, tickets) => {
	// 		if (!err) {
	// 			res.status(200).json({
	// 				tickets: tickets
	// 			});
	// 		}
	// 	});
	// }
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
