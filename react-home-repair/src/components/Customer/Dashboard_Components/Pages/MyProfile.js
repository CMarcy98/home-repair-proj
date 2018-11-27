import React, { Component } from 'react';

export default class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: []
		}
	}

	render() {

		const email = this.state.profile
		return (
			<div>My Profile Page</div>
		);
	}
}
