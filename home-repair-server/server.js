const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 8000;

// All routes need to be registered here
const userRoutes = require('./api/routes/users');
const productRoutes = require('./api/routes/products');
const providerRoutes = require('./api/routes/providers');


// Establish app settings and establish necessary connections
mongoose.connect("mongodb://localhost/home-repair", { useNewUrlParser: true }); 	// Establish database connection
app.use(morgan('dev'));																// Logger for api
app.use(bodyParser.urlencoded({extended: true}));			// Allows us to parse body of post request
app.use(bodyParser.json());


// Allows our RESTful API to be accessed by any server and not only the port that the serve is running on
app.use((req, res, next) => {
	// If we deploy to production, we change the star to our url to whitelist it
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
app.use('/users', userRoutes);
app.use('/providers', providerRoutes);


// App listens on 8000
app.listen(PORT, () => {
	console.log("Home Repair server started on port "+ PORT + "!");
});