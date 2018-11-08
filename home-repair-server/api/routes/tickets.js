const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');

// Gets all tickets
router.get('/', (req, res) => {
	// Retrieves all tickets
	Ticket.find({}, (err, tickets) => {
		if (!err) {
			res.status(200).json({
				tickets: tickets
			});
		}
	});
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