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
			<h2 style={{ marginTop: 0, fontWeight: '100', backgroundColor: 'white', padding: '18px 0 18px 5%' }}>My Profile</h2>
		);
	}
}
