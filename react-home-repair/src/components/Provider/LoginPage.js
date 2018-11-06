import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import LoginForm from "./LoginForm";

export default class LoginPage extends Component {
	render() {
		return (
			<div style={{ padding: '0 30%' }}>
				<Panel>
					<Panel.Heading>
						<Panel.Title className="text-center" componentClass="h1">Provider Login</Panel.Title>
					</Panel.Heading>
					<Panel.Body>
						<LoginForm/>
					</Panel.Body>
				</Panel>
			</div>
		);
	}
}