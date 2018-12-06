import React, { Component } from 'react';
import axios from 'axios';
import './MyProfile.css';

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
		// console.log('Profile:', this.state.profile);
		const userInfo = this.state.profile;
		const username = userInfo.username ? userInfo.username : '';
		const firstName = userInfo.firstName ? userInfo.firstName : '';
		const lastName = userInfo.lastName ? userInfo.lastName : '';
		const email = userInfo.email ? userInfo.email : '';
		const phoneNumber = userInfo.phoneNumber ? userInfo.phoneNumber : '';
		const address = userInfo.address ? userInfo.address : '';
		const city = userInfo.city ? userInfo.city : '';
		const state = userInfo.state ? userInfo.state : '';
		const zipCode = userInfo.zipCode ? userInfo.zipCode : '';
		return (
			<div>
				<h2 style={{ marginTop: 0, fontWeight: '100', backgroundColor: 'white', padding: '18px 0 18px 5%' }}>Hello, {firstName} {lastName}</h2>

				<div className="row">
				<div className="column" style={{borderRight: '1px solid black'}}>
				<h1 className="data-table-row" style = {{padding: '18px 0 18px 5%' }}>Profile</h1>
				<div className="data-table">
					<div className="data-table-row" style = {{padding: '18px 0 18px 5%' }}>
						<div className="row-title">Username:</div>
						<div><strong>{username}</strong></div>
					</div>

					<div className="data-table-row" style = {{padding: '18px 0 18px 5%' }}>
						<div className="row-title">Name:</div>
						<div><strong>{firstName} {lastName}</strong></div>
					</div>

					<div className="data-table-row" style = {{padding: '18px 0 18px 5%' }}>
						<div className="row-title">Email:</div>
						<div><strong>{email}</strong></div>
					</div>

					<div className="data-table-row" style = {{padding: '18px 0 18px 5%' }}>
						<div className="row-title">Phone:</div>
						<div><strong>{phoneNumber}</strong></div>
					</div>
				</div>
				</div>

				<div className="column" style={{borderLeft: '1px solid black', backgroundColor: '#bbb'}}>
				<h1 className="data-table-row" style = {{padding: '18px 0 18px 5%' }}>Address</h1>
				<div className="data-table">
					<div className="data-table-row" style = {{padding: '18px 0 18px 5%' }}>
						<div className="row-title">Street:</div>
						<div><strong>{address}</strong></div>
					</div>

					<div className="data-table-row" style = {{padding: '18px 0 18px 5%' }}>
						<div className="row-title">City:</div>
						<div><strong>{city}</strong></div>
					</div>

					<div className="data-table-row" style = {{padding: '18px 0 18px 5%' }}>
						<div className="row-title">State:</div>
						<div><strong>{state}</strong></div>
					</div>

					<div className="data-table-row" style = {{padding: '18px 0 18px 5%' }}>
						<div className="row-title">Zip Code:</div>
						<div><strong>{zipCode}</strong></div>
					</div>
				</div>
				</div>
				</div>

			</div>
		);
	}
}
