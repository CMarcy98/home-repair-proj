import React, { Component } from 'react';
import SidebarMenu from './dashboard_components/SidebarMenu';
import Container from './dashboard_components/Container';

export default class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			title: 'Open Tickets'
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
				<SidebarMenu handleChange={this.handleChange} />
				<Container component={this.state.title} />
			</div>
		);
	}
}