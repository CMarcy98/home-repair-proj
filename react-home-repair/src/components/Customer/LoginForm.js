import React, { Component } from 'react';
import { Form, Col, FormGroup, FormControl, Checkbox, Button, ControlLabel } from 'react-bootstrap';
import axios from "axios/index";
import { Redirect } from 'react-router';

export default class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			redirect: false
		}

		this.loginUser = this.loginUser.bind(this);
	}

	render() {
		if (this.state.redirect === true) {
			return <Redirect to="/customer/home" />;
		}

		return (
			<Form horizontal>
				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>Username</Col>
					<Col sm={10}>
						<FormControl type="text" placeholder="Username" value={this.state.username} onChange={event => { this.setState({ username: event.target.value }) }} />
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalPassword">
					<Col componentClass={ControlLabel} sm={2}>Password</Col>
					<Col sm={10}>
						<FormControl type="password" placeholder="Password" value={this.state.password} onChange={event => { this.setState({ password: event.target.value }) }} />
					</Col>
				</FormGroup>

				<FormGroup>
					<Col smOffset={2} sm={10}>
						<Checkbox>Remember me</Checkbox>
					</Col>
				</FormGroup>

				<FormGroup>
					<Col smOffset={2} sm={10}>
						<Button onClick={this.loginUser}>Sign in</Button>
					</Col>
				</FormGroup>
			</Form>
		);
	}

	loginUser() {
		const user = {
			username: this.state.username,
			password: this.state.password
		};

		// Checks to see if the user is logged in
		axios.post('http://localhost:8000/users/login', user)
			.then(res => {
				const user = res.data.user;
				if (user.length >= 1) {
					const userId = user[0]._id;
					localStorage.setItem('userId', userId);
					this.setState({ redirect: true });
				} else {
					console.log('We dont have a valid user, send a message and show a red div that they do not exist...');
				}
			})
			.catch(err => {
				console.log('Error:', err);
			});
	}
}