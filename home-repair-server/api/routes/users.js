const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Gets all users
router.get('/', (req, res) => {
	User.find({}, (err, users) => {
		if (!err) {
			res.status(200).json({
				users: users
			});
		}
	});
});

// Creates a new user with a unique username
router.post("/", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const phoneNumber = req.body.phoneNumber;
	const address = req.body.address;
	const city = req.body.city;
	const state = req.body.state;
	const zipCode = req.body.zipCode;

	const newUser = {
		username: username,
		password: password,
		firstName: firstName,
		lastName: lastName,
		email: email,
		phoneNumber: phoneNumber,
		address: address,
		city: city,
		state: state,
		zipCode: zipCode
	};

	//Check to see if user exists before we create another one
	User.find({username}, (err, user) => {
		if(!err) {
			// If there is no user existing, create a new one. Else return error message
			if (user.length === 0) {
				User.create(newUser, (err) => {
					if(!err) {
						res.status(201).json({
							message: 'User created!'
						});
					}
				});
			} else {
				res.status(200).json({
					error: 'User with username exists already'
				});
			}
		}
	});
});

// Endpoint to provide information about if there is an existing user in the database
router.post("/login", (req, res) => {
	// GOAL: We want to see if a user exists with the given username and password combination
	// 			 IF they exist, give them the info back
	User.find({ username: req.body.username, password: req.body.password }, (err, user) => {
		if (!err) {
			res.status(200).json({
				message: 'User found!',
				user: user
			});
		}
	});
});

// Gets a specific user
router.get('/:userId', (req, res) => {
	const id = req.params.userId;

	User.findById({ _id: id }, (err, user) => {
		if (!err) {
			res.status(200).json({
				user: user
			});
		}
	});
});

// Updates specific user
router.patch('/:userId', (req, res) => {
	res.status(200).json({
		message: 'Updated user!'
	});
});

// Deletes a specific user
router.delete('/:userId', (req, res) => {
	res.status(204).json({
		message: 'Deleted user!'
	});
});

module.exports = router;