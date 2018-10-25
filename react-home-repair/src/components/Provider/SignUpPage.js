import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import SignUpForm from "./SignUpForm";

export default class SignUpPage extends Component {
	render() {
		return (
			<div className="container">
				<Panel>
					<Panel.Heading>
						<Panel.Title className="text-center" componentClass="h1">Provider Sign Up</Panel.Title>
					</Panel.Heading>
					<Panel.Body>
						<SignUpForm/>
					</Panel.Body>
				</Panel>
			</div>
		);
	}
}