import React, { Component } from 'react';
import { Form, Col, FormGroup, Button } from 'react-bootstrap';
import axios from "axios/index";
import { Redirect } from 'react-router';
import FieldGroup from '../FieldGroup';

export default class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			passwordError: false,
			usernameError: '',
			usernameBlank: false,
			usernameNotFound: '',
			redirect: false
		}

		this.loginProvider = this.loginProvider.bind(this);
	}

	render() {
		if (this.state.redirect === true) {
			return <Redirect to="/provider/home" />;
		}

		return (
			<Form horizontal>
				{/* Username field */}
				<Col lgOffset={2} lg={8}>
					<FieldGroup style={{ marginBottom: '10px' }} placeholder="Username" value={this.state.username}
											error={this.state.usernameBlank || this.state.usernameNotFound.length > 0}
											help={this.state.usernameNotFound}
											onChange={(e) => {this.setState({ username: e.target.value })}} />
				</Col>

				{/* Password field */}
				<Col lgOffset={2} lg={8}>
					<FieldGroup style={{ marginBottom: '10px' }} placeholder="Password" value={this.state.password}
											type="password"
											error={(this.state.passwordError ? true : false) || (this.state.usernameError)}
											help={this.state.usernameError.length > 0 ? this.state.usernameError : false}
											onChange={(e) => {this.setState({ password: e.target.value })}} />
				</Col>

				{/* Submit button so that user can sign up */}
				<Col lgOffset={2} lg={4}>
					<FormGroup style={{paddingTop: '10px'}}>
						<Button bsStyle="success" onClick={() => {this.loginProvider()}}>Agree and Continue</Button>
					</FormGroup>
				</Col>

			</Form>
		);
	}

	loginProvider() {
		const { username, password } = this.state;

		// Set state variable for error styling
		this.setState({
			usernameBlank: (username.length < 1 ? true : false),
			passwordError: (password.length < 1 ? true : false),
			usernameNotFound: ''
		});

		// Validation to check that no fields are empty
		if (username.length > 1 && password.length > 1) {
			const user = {
				username: username,
				password: password
			};

			// Checks to see if the user is logged in
			axios.post('http://localhost:8000/providers/login', user)
				.then(res => {
					let errorMsg = null;
					if (res.data.error) {
						errorMsg = res.data.error;
					}
					const provider = res.data.provider;

					// If there is a provider with the given username
					if (provider && provider.length >= 1) {
						const providerId = provider[0]._id;
						localStorage.setItem('userId', providerId);
						this.setState({ redirect: true });
					} else if (errorMsg) {
						this.setState({ usernameNotFound: errorMsg });
					} else {
						this.setState({ usernameError: res.data.passwordError });
					}
				})
				.catch(err => {
					console.log('Error:', err);
				});
		}
	}
}