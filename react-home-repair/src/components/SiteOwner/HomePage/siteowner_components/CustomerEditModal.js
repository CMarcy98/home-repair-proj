import React, { Component } from 'react';
import { Modal, Form, FormGroup, FormControl, Col, Button, ControlLabel, Checkbox, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class CustomerEditModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			_id: this.props.user._id,
			username: this.props.user.username,
			password: this.props.user.password,
			firstName: this.props.user.firstName,
			lastName: this.props.user.lastName,
			email: this.props.user.email,
			phoneNumber: this.props.user.phoneNumber,
			address: this.props.user.address,
			city: this.props.user.city,
			state: this.props.user.state,
			zipCode: this.props.user.zipCode,
			submitted: false
		};
		this.submitForm = this.submitForm.bind(this);
	}

componentWillMount(){

}

	render() {


		return (
			<Modal show={this.props.showModal} onHide={this.props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title><strong>User Details</strong></Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Form horizontal>
					{/* Form group that holds the username and password fields */}
					<FormGroup>
						<Col lgOffset={1} lg={5}>
							<ControlLabel>Username </ControlLabel>
							<FormControl type="text" placeholder='Username' value={this.state.username} onChange={event => { this.setState({ username: event.target.value }) }} />

						</Col>
						<Col lg={5}>
							<ControlLabel>Password</ControlLabel>
							<FormControl type="password" placeholder='Password' value={this.state.password} onChange={event => { this.setState({ password: event.target.value }) }} />
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

					{/* This is the submit button so that we can submit a form to the server */}
					<FormGroup>
						<Col lgOffset={4} lg={4} >
							<Button bsStyle="success" block onClick={this.submitForm}>Submit Changes</Button>
						</Col>
					</FormGroup>
				</Form>


				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
);
}
//This should update the information but it doesn't :(
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

	axios.put(`http://localhost:8000/users/${this.state._id}`, user)
    .then(res => {
      console.log('Updated information');
    })
    .catch(err => {
      console.log('Error:', err);
    });


}
}
