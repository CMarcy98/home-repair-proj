import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, Checkbox, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';

import FieldGroup from '../FieldGroup';

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
			businessName: '',
			email: '',
			phoneNumber: '',
			location: '',
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
				<Col lg={8} lgOffset={2}>
					<h4>Business Information</h4>
					<FieldGroup id={"1"} label="Business Name" placeholder="Business Name" />
				</Col>

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
		const provider = {
			username: this.state.username,
			password: this.state.password,
			businessName: this.state.businessName,
			email: this.state.email,
			phoneNumber: this.state.phoneNumber,
			address: this.state.address
		};

		const errorObj = this.checkPassword(this.state.password);

		if (errorObj.length === 0 && this.state.username.length > 3) {
			axios.post('http://localhost:8000/providers', provider)
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