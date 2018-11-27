import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Container from './Container';

export default class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			title: 'My Profile'
		};

		this.handleChange = this.handleChange.bind(this);
	}

	// Changes what the container renders based on what was passed into it
	handleChange(name) {
		this.setState({ title: name });
	}

	render() {
		return (
			<div style={{ display: 'flex' }}>
				<Sidebar name={"Test"} handleChange={this.handleChange} />
				<Container component={this.state.title} />
			</div>
		);
	}
}
