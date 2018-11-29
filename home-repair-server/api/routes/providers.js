const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Provider = require('../models/provider');
const saltRounds = 10;

// Gets all providers
router.get('/', (req, res) => {
	Provider.find({}, (err, providers) => {
		if (!err) {
			res.status(200).json({
				message: 'Success on providers route!',
				providers: providers
			});
		}
	});
});

// Creates a new provider with a unique username (SIGN-UP)
router.post("/", (req, res) => {
	//Check to see if user exists before we create another one
	Provider.find({username: req.body.username}, (err, provider) => {
		if(!err) {
			// If there is no provider existing, create a new one. Else return error message
			if (provider.length === 0) {
				// Create an obj so that we can overwrite the password generated with bcrypt
				const provider = req.body;

				// Encrypt password here
				bcrypt.hash(provider.password, saltRounds, (err, hash) => {
					if(!err) {
						// Reassign password field now that it is hashed
						provider.password = hash;

						// Create a provider in the database
						Provider.create(provider, (err) => {
							if(!err) {
								res.status(201).json({
									message: 'User created!'
								});
							}
						});
					}
				});
			} else {
				res.status(200).json({
					error: 'User with username exists already'
				});
			}
		} else {
			res.status(500).json({
				error: err
			});
		}
	});
});

// Endpoint to provide information about if there is an existing provider in the database
router.post("/login", (req, res) => {
	const { username, password } = req.body;

	// Need to compare passwords using bcrypt functionality
	Provider.find({ username: username }, (err, provider) => {
		if (!err) {
			// Check to see if there is any providers
			if(provider.length === 1) {
				// Grab the password from the provider for password checking purposes
				const hash = provider[0].password;

				// Compares hashed password saved in db to the password sent by client
				bcrypt.compare(password, hash, (error, response) => {
					const prov = response ? provider : [];

					// If we do not get a match, make an error message for the response to send back
					let errMsg;
					if(!response) {
						errMsg = 'Password is incorrect';
					}

					res.status(200).json({
						provider: prov,
						passwordError: errMsg
					});
				});
			} else {
				res.status(200).json({
					error: "Username not found"
				});
			}
		} else {
			res.status(404).json({
				error: err
			});
		}
	});
});

// Gets a specific provider
router.get('/:provId', (req, res) => {
	const id = req.params.provId;

	Provider.findById({ _id: id }, (err, provider) => {
		if (!err) {
			res.status(200).json({
				provider: provider
			});
		}
	});
});

// Updates specific provider
router.patch('/:userId', (req, res) => {
	res.status(200).json({
		message: 'Updated user!'
	});
});

// Deletes a specific provider
router.delete('/:userId', (req, res) => {
	res.status(204).json({
		message: 'Deleted user!'
	});
});

module.exports = router;