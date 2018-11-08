import React, { Component } from 'react';
import { Form, Col, FormGroup, Button } from 'react-bootstrap';
import axios from "axios/index";
import { Redirect } from 'react-router';
import FieldGroup from "../FieldGroup";

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
				{/* Username field */}
				<Col lgOffset={2} lg={8}>
					<FieldGroup style={{ marginBottom: '10px' }} placeholder="Username" value={this.state.username}
											onChange={(e) => {this.setState({ username: e.target.value })}} />
				</Col>

				{/* Password field */}
				<Col lgOffset={2} lg={8}>
					<FieldGroup style={{ marginBottom: '10px' }} placeholder="Password" value={this.state.password}
											type="password"
											onChange={(e) => {this.setState({ password: e.target.value })}} />
				</Col>

				{/* Submit button so that user can sign up */}
				<Col lgOffset={2} lg={4}>
					<FormGroup style={{paddingTop: '10px'}}>
						<Button bsStyle="success" onClick={() => {this.loginUser()}}>Sign in</Button>
					</FormGroup>
				</Col>

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