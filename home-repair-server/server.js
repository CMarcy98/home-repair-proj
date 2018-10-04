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


// Tells the App specific routes to use using router in each file
app.use('/products', productRoutes);


// Tells the app the specific function to use at the specified
app.post("/user", (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const newUser = {
		firstName: firstName,
		lastName: lastName
	};

	User.create(newUser, (err) => {
		res.status(200).json({
			message: 'User created!'
		});
	});
});

app.get("/user", (req, res) => {
	User.find({}, (err, users) => {
		if (!err) {
			res.status(200).json({
				users: users
			});
		}
	});
});


// App listens on 8000
app.listen(PORT, () => {
	console.log("Home Repair server started on port "+ PORT + "!");
});