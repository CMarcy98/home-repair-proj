import React, { Component } from 'react';
import {Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';

import FieldGroup from '../FieldGroup';
import './SignUpForm.css';

const errorMessage = <p style={{fontSize: '10px', marginBottom: 0}}>Password should contain <em>8 characters, one upper and lower case letter and one number</em></p>;

export default class SignUpForm extends Component {
	constructor() {
		super();
		this.state = {
			username: 'test',
			password: 'Password1',
			email: 'test@gmail.com',
			firstName: 'Christian',
			lastName: 'Marcy',
			businessName: 'Rustys Repair Store',
			businessPhone: '1238763456',
			service: '',
			address: '101 Sally Ln.',
			city: 'Test',
			state: 'NJ',
			zipCode: '90876',
			redirect: false,
			usernameError: '',
			passwordError: false,
			submitted: false
		};

		this.submitForm = this.submitForm.bind(this);
	}

	render() {
		if (this.state.redirect === true) {
			return <Redirect to="/provider/login" />;
		}

		// const usernameError = this.state.usernameError.length > 0 ? <span style={{color: 'red'}}>({this.state.usernameError})</span> : "";

		return (
			<div>
				<Col style={{paddingBottom: '10px'}} lgOffset={2} lg={10}>
					<h3 style={{fontWeight: 100, marginLeft: '-4%'}}>Sign up for a Provider account</h3>
				</Col>
				{/* Login information */}
				<Form horizontal>
					<Col lg={8} lgOffset={2}>
						<h5 style={{ marginLeft: '-5%', fontWeight: 100 }}>Create a login</h5>
						<FieldGroup placeholder="User Name" value={this.state.username}
												onChange={(e) => {this.setState({ username: e.target.value })}} />
						<FieldGroup placeholder="Password" type="password" value={this.state.password}
												help={this.state.passwordError ? errorMessage : false}
												error={this.state.passwordError ? true : false}
												onChange={(e) => {this.setState({ password: e.target.value })}} />
						<FieldGroup placeholder="Email address" value={this.state.email}
												onChange={(e) => {this.setState({ email: e.target.value })}} />
					</Col>
				</Form>
				{/* Business information */}
				<Form horizontal>
					<Col style={{padding: 0}} lg={8} lgOffset={2}>
						<h5 style={{fontWeight: 100}}>Enter your business information</h5>
						{/* First and last name fields */}
						<Col lg={6}>
							<FieldGroup id={"4"} value={this.state.firstName} placeholder="Legal first name" onChange={(e) => {this.setState({ firstName: e.target.value })}} />
						</Col>
						<Col lg={6}>
							<FieldGroup style={{marginLeft: '5px'}} id={"5"} value={this.state.lastName} placeholder="Legal last name" onChange={(e) => {this.setState({ lastName: e.target.value })}} />
						</Col>

						{/* Business name and business phone */}
						<Col lg={7}>
							<FieldGroup id={"6"} placeholder="Legal business name" value={this.state.businessName} onChange={(e) => {this.setState({ businessName: e.target.value })}} />
						</Col>
						<Col lg={5}>
							<FieldGroup style={{marginLeft: '5px'}} id={"7"} placeholder="Business phone" value={this.state.businessPhone} onChange={(e) => {this.setState({ businessPhone: e.target.value })}} />
						</Col>

						{/* Services offered */}
						<Col lg={5} style={{ width: '150px' }}>
							<p style={{ fontWeight: 100, fontSize: '11px' }}>Services provided:</p>
						</Col>
						<Col lg={6}>
							<FormGroup>
								<FormControl value={this.state.service} onChange={(e) => {this.setState({ service: e.target.value })}} componentClass="select">
									<option value="" disabled>Choose a service below</option>
									<option value="Electrical">Electrical</option>
									<option value="Plumbing">Plumbing</option>
									<option value="Flooring">Flooring</option>
									<option value="Contracting">Contracting</option>
									<option value="Other">Other</option>
								</FormControl>
							</FormGroup>
						</Col>

						{/* Address */}
						<Col lg={12} style={{width: '101%'}}>
							<FieldGroup id={"8"} placeholder="Street address (NO PO Box)" value={this.state.address} onChange={(e) => {this.setState({ address: e.target.value })}} />
						</Col>

						{/* City, state, and zip code */}
						<Col lg={5}>
							<FieldGroup id={"9"} placeholder="City" value={this.state.city} onChange={(e) => {this.setState({ city: e.target.value })}} />
						</Col>
						<Col lg={7}>
							<Col lg={5}>
								<FormGroup>
									<FormControl componentClass="select" placeholder="State">
										<option value="NJ">NJ</option>
										<option value="NY">NY</option>
										<option value="PA">PA</option>
									</FormControl>
								</FormGroup>
							</Col>
							<Col lgOffset={1} lg={6}>
								<FieldGroup id={"10"} placeholder="Zip code" value={this.state.zipCode} onChange={(e) => {this.setState({ zipCode: e.target.value })}} />
							</Col>
						</Col>

						{/* Terms and Agreements for users information */}
						<Col lg={12} style={{paddingRight: 0, paddingLeft: 0}}>
							<p style={{fontSize: '12px'}}>
								You have read and agree to <a>Raccoon Repair User Agreement, Privacy Policy</a>, and <a>E-Communication Delivery
								Policy</a>. If you provide your mobile number and email, you confirm that you are authorized to add this number and give us
								permission to contact you, along with others, about your branded Raccoon Repair accounts using text messages
								and/or emails.
							</p>
						</Col>

						{/* Submit button so that user can sign up */}
						<Col lg={4}>
							<FormGroup>
								<Button bsStyle="success" onClick={() => {this.submitForm()}}>Agree and Continue</Button>
							</FormGroup>
						</Col>
					</Col>
				</Form>
			</div>
		);
	}

	// Grabs all necessary information from the sign up form and posts it to the server
	// Maybe we want to add some type of validation to make sure user fills in fields!
	submitForm() {
		this.setState({ submitted: true });
		const provider = {
			username: this.state.username,
			password: this.state.password,
			email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			businessName: this.state.businessName,
			businessPhone: this.state.businessPhone,
			service: this.state.service,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			zipCode: this.state.zipCode
		};

		const errorObj = this.checkPassword(this.state.password);

		if (errorObj.length === 0 && this.state.username.length > 3) {
			this.setState({ passwordError: false });
			console.log(this.state);
			axios.post('http://localhost:8000/providers', provider)
				.then(res => {
					if (!res.data.error) {
						this.setState({redirect: true});
					} else {
						this.setState({ usernameError: res.data.error });
					}
				})
				.catch(err => {
					console.log('Error:', err);
				});
		} else {
			this.setState({ passwordError: true });
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