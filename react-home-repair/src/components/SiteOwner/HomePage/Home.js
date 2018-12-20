import React, { Component } from 'react';
import SideMenu from "./siteowner_components/SideMenu";
import Container from "./siteowner_components/Container";


export default class Home extends Component {
  constructor() {
		super();
		this.state = {
			title: 'All Tickets'
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
				<SideMenu handleChange={this.handleChange} />
				<Container component={this.state.title} />
			</div>
		);
	}
}
