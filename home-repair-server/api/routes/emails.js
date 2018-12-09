const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'raccoon.repair@gmail.com',
		pass: 'Racc00nRepair'
	}
});

// Sends an email to specific provider with a specific message
// Grab sender info from the request body along with the text

// Refactor #1: We need to restructure endpoint to handle generix text input

// Notification for new work ticket
// 'Hello Provider!\n\nWe at Raccoon Repair are pleased to tell you that there is a customer with a problem that you could possibly solve.' +
//	' Go check your account to see if you can help that customer.\n\nHave a great day,\nRaccoon Repair Team'
router.post('/', (req, res) => {
	const mailOptions = {
		from: 'raccoon.repair@gmail.com',
		to: req.body.email,
		subject: 'Customer Ticket Awaiting!',
		text: req.body.text
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
			res.status(200).json({
				msg: info
			});
		}
	});
});

module.exports = router;
