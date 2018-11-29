import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import SignUpForm from "./SignUpForm";

export default class SignUpPage extends Component {
	render() {
		return (
			<div className="container" style={{ width: '40%' }}>
				<Panel>
					<Panel.Body>
						<SignUpForm/>
					</Panel.Body>
				</Panel>
			</div>
		);
	}
}