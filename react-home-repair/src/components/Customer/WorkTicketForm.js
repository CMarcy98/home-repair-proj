/*
 * This component is responsible for containing all the information that a customer needs in order to
 * make a ticket for this web application.
 *
 * Ideal Fields are as follows: First Name, Last Name, Email, Address (street, state, zip),
 * Phone Number.... (etc.)
 *
 * @author: William Saffaye - wsaffaye@gmail.com
 * date: 10/30/18
 */
import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class WorkTicketForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			firstName: 'Emily',
			lastName: 'Marcy',
			email: 'test@email.com',
			phoneNumber: '732123456',
			address: 'Test Address Rd.',
			city: 'Farmville',
			state: 'NY',
			zipCode: '01923',
      service:  '',
			description: '',
			redirect: false,
			submitted: false
		}

		this.submitForm = this.submitForm.bind(this);
	} // end if constructor

//Anything put in here gets rendered to the screen
	render() {

		if(this.state.redirect) {
			return (<Redirect to="/customer/home" />);
		}

		return (
			<div>
				<h1>Work ticket form</h1>

				<Form horizontal>

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
						</Col>
						<Col lg={5}>
							<ControlLabel>Phone Number</ControlLabel>
							<FormControl type="text" placeholder='Phone Number' value={this.state.phoneNumber} onChange={event => { this.setState({ phoneNumber: event.target.value }) }} />
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

					{/* Dropdown box to select which type of repair sevice is needed */}
					<FormGroup controlId="formControlsSelect">
					 <Col lgOffset={1} lg={4}>
						<ControlLabel>Repair</ControlLabel>
						<FormControl onChange={(e) => { this.setState({ service: e.target.value }) }} componentClass="select" placeholder="select">
							<option value="select">Select</option>
							<option value="Electrical">Electrical</option>
							<option value="Plumbing">Plumbing</option>
							<option value="Flooring">Flooring</option>
							<option value="Contracting">Contracting</option>
							<option value="Other">Other</option>
						</FormControl>
						</Col>

						<Col lgOffset={1} lg={4}>
      			<ControlLabel>Problem Description</ControlLabel>
      			<FormControl onChange={(e) => { this.setState({ description: e.target.value }) }} componentClass="textarea" placeholder="Describe your problem here..." />
						</Col>

					</FormGroup>

					{/* This is the submit button so that we can submit a ticket to the server */}
					<FormGroup>
						<Col lgOffset={4} lg={4} >
							<Button bsStyle="success" block onClick={this.submitForm}>Submit Ticket</Button>
						</Col>
					</FormGroup>
				</Form>
				</div>
		);
	}

	submitForm() {
		this.setState({ submitted: true });

		// Constructs ticket object so that we can post to the server
		const ticket = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			phone: this.state.phoneNumber,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			zipCode: this.state.zipCode,
			service: this.state.service,
			description: this.state.description
		};

		// Posts the ticket object to the server so that providers can see their tickets
		axios.post('http://localhost:8000/tickets', ticket)
			.then(res => {
				this.setState({ redirect: true });
				console.log('Result:', res);
			})
			.catch(err => {
				console.log('Error:', err);
			});

	}
}
