const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 8000;

// Imported Schemas
const User = require('./api/models/user');


// All routes need to be registered here
const productRoutes = require('./api/routes/products');


// Establish app settings and establish necessary connections
mongoose.connect("mongodb://localhost/home-repair", { useNewUrlParser: true }); 	// Establish database connection
app.use(morgan('dev'));																// Logger for api
app.use(bodyParser.urlencoded({extended: true}));			// Allows us to parse body of post request
app.use(bodyParser.json());


// Allows our RESTful API to be accessed by any serve and not only the port that the serve is running on
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers','*');

	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});


// Tells the App specific routes to use using router in each file
app.use('/products', productRoutes);


// Tells the app the specific function to use at the specified
app.post("/user", (req, res) => {
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

	User.create(newUser, (err) => {
		if(!err) {
			res.status(200).json({
				message: 'User created!'
			});
		} else {
			res.status().json({
				Error: err
			});
		}
	});
});

app.get("/users", (req, res) => {
	User.find({}, (err, users) => {
		if (!err) {
			res.status(200).json({
				users: users
			});
		}
	});
});

// Allows us to get information about a user without showing the user information in the url
app.post("/user/login", (req, res) => {
	console.log('Request body: ', req.body);
	User.find({ username: req.body.username, password: req.body.password }, (err, user) => {
		if (!err) {
			res.status(200).json({
				message: 'User found!',
				user: user
			});
		}
	});
});


// App listens on 8000
app.listen(PORT, () => {
	console.log("Home Repair server started on port "+ PORT + "!");
});