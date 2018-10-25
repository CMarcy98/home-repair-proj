/*
 * This component is responsible for containing all the information that a customer needs in order to
 * sign up for this web application.
 *
 * Ideal Fields are as follows: First Name, Last Name, Email, Address (street, state, zip),
 * Phone Number.... (etc.)
 *
 * @author: Christian Marcy - christian.marcy@gmail.com
 * date: 10/9/18
 */
import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, Checkbox, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';

const validationError = {
	borderRadius: '5px',
	borderColor: '#ff757c'
};

export default class SignUpForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			firstName: 'Emily',
			lastName: 'Marcy',
			email: 'test@email.com',
			phoneNumber: '732123456',
			address: 'Test Address Rd.',
			city: 'Farmville',
			state: 'NY',
			zipCode: '01923',
			redirect: false,
			usernameError: '',
			passwordError: [],
			submitted: false
		};

		this.submitForm = this.submitForm.bind(this);
	}

	render() {
		if (this.state.redirect === true) {
			return <Redirect to="/customer/login" />;
		}

		const usernameError = this.state.usernameError.length > 0 ? <span style={{color: 'red'}}>({this.state.usernameError})</span> : "";

		return (
			<Form horizontal>
				{/* Form group that holds the username and password fields */}
				<FormGroup>
					<Col lgOffset={1} lg={5}>
						<ControlLabel>Username {usernameError}</ControlLabel>
						<FormControl style={(this.state.submitted && this.state.username.length < 4) ? validationError : {}} type="text" placeholder='Username' value={this.state.username} onChange={event => { this.setState({ username: event.target.value }) }} />
						<HelpBlock style={{marginBottom: 0, fontSize: '0.8em'}}>Username should contain <em>4 characters</em></HelpBlock>
					</Col>
					<Col lg={5}>
						<ControlLabel>Password</ControlLabel>
						<FormControl style={this.state.passwordError.length > 0 ? validationError: {}} type="password" placeholder='Password' value={this.state.password} onChange={event => { this.setState({ password: event.target.value }) }} />
						<HelpBlock style={{marginBottom: 0, fontSize: '0.8em'}}>Password should contain <em>8 characters, one upper and lower case letter and one number</em></HelpBlock>
					</Col>
				</FormGroup>

				{/* Form group that holds the first name and last name fields */}
				<FormGroup>
					<Col lgOffset={1} lg={5}>
						<ControlLabel>First Name</ControlLabel>
						<FormControl type="text" placeholder='First Name' value={this.state.firstName} onChange={event => { this.setState({ firstName: event.target.value }) }} />
					</Col>
					<Col lg={5}>
						<ControlLabel>Last Name</ControlLabel>
						<FormControl type="text" placeholder='Last Name' value={this.state.lastName} onChange={event => { this.setState({ lastName: event.target.value }) }} />
					</Col>
				</FormGroup>

				{/* Email and Phone Number */}
				<FormGroup>
					<Col lgOffset={1} lg={5}>
						<ControlLabel>Email Address</ControlLabel>
						<FormControl type="email" placeholder='Email' value={this.state.email} onChange={event => { this.setState({ email: event.target.value }) }} />
						<Checkbox checked readOnly>Send me email updates</Checkbox>
					</Col>
					<Col lg={5}>
						<ControlLabel>Phone Number</ControlLabel>
						<FormControl type="text" placeholder='Phone Number' value={this.state.phoneNumber} onChange={event => { this.setState({ phoneNumber: event.target.value }) }} />
						<Checkbox checked readOnly>Send me text message updates</Checkbox>
					</Col>
				</FormGroup>

				{/* Address Line */}
				<FormGroup>
					<Col lgOffset={1} lg={8}>
						<ControlLabel>Address Line 1<sup>*</sup></ControlLabel>
						<FormControl type="text" placeholder='Address Line 1' value={this.state.address} onChange={event => { this.setState({ address: event.target.value }) }} />
					</Col>
				</FormGroup>

				{/* City, State and Zip Code Line */}
				<FormGroup>
					<Col lgOffset={1} lg={2}>
						<ControlLabel>City</ControlLabel>
						<FormControl type="text" placeholder='City' value={this.state.city} onChange={event => { this.setState({ city: event.target.value }) }} />
					</Col>
					<Col lgOffset={1} lg={2}>
						<ControlLabel>State</ControlLabel>
						<FormControl type="text" placeholder='State' value={this.state.state} onChange={event => { this.setState({ state: event.target.value }) }} />
					</Col>
					<Col lgOffset={1} lg={2}>
						<ControlLabel>Zip Code</ControlLabel>
						<FormControl type="text" placeholder='Zip Code' value={this.state.zipCode} onChange={event => { this.setState({ zipCode: event.target.value }) }} />
					</Col>
				</FormGroup>

				{/* This is the submit button so that we can submit a form to the server */}
				<FormGroup>
					<Col lgOffset={4} lg={4} >
						<Button bsStyle="success" block onClick={this.submitForm}>Sign Up</Button>
					</Col>
				</FormGroup>
			</Form>
		);
	}

	// Grabs all necessary information from the sign up form and posts it to the server
	// Maybe we want to add some type of validation to make sure user fills in fields!
	submitForm() {
		this.setState({ submitted: true });
		const user = {
			username: this.state.username,
			password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			phoneNumber: this.state.phoneNumber,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			zipCode: this.state.zipCode
		};

		const errorObj = this.checkPassword(this.state.password);

		if (errorObj.length === 0 && this.state.username.length > 3) {
			axios.post('http://localhost:8000/users', user)
				.then(res => {
					if (!res.data.error) {
						this.setState({redirect: true});
					} else {
						this.setState({usernameError: res.data.error});
					}
				})
				.catch(err => {
					console.log('Error:', err);
				});
		} else {
			this.setState({ passwordError: errorObj });
		}
	}

	// Validates password for One Upper Case letter, One lower case letter,
	// one digit, and length is greater than 7
	checkPassword(password) {
		// Error array so that we can tell the user what is wrong with the password
		const error = [];

		// Password length
		if (password.length <= 7) {
			error.push('Password needs to be at least 8 characters long.');
		}

		// One upper case letter
		let regex = /[A-Z]{1}/;
		if (!regex.test(password)) {
			error.push('Password needs at least one upper case letter.');
		}

		// One lower case letter
		regex = /[a-z]{1}/;
		if(!regex.test(password)) {
			error.push('Password needs at least one lower case letter.');
		}

		// One number
		regex = /\d{1}/;
		if (!regex.test(password)) {
			error.push('Password needs at least one number.');
		}

		return error;

	}
}