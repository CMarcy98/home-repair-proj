import React, { Component } from 'react';
import axios from 'axios';

export default class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: {}
		}
	}

	componentWillMount(){
		const userId = localStorage.getItem('userId');
		axios.get(`http://localhost:8000/users/${userId}`)
		.then(res => {
			this.setState({ profile: res.data.user });
		})
		.catch(err => {
			console.log(err);
		});
	}

	render() {
		console.log('Profile:', this.state.profile);
		const userInfo = this.state.profile;
		const email = userInfo.email ? userInfo.email : '';
		return (
			<div>
				<h2 style={{ marginTop: 0, fontWeight: '100', backgroundColor: 'white', padding: '18px 0 18px 5%' }}>My Profile</h2>
				<p>{email}</p>
			</div>
		);
	}
}
