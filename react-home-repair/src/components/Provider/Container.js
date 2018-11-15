import React, { Component } from 'react';
import MyProfile from './dashboard_pages/MyProfile';
import OpenTickets from "./dashboard_pages/OpenTickets";

export default class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: {
				'My Profile': <MyProfile />,
				'Open Tickets': <OpenTickets/>
			}
		}
	}

	render() {
		let component = this.state.items[this.props.component];

		return (<div style={{ width: '85vw', height: '90vh', backgroundColor: '#EBEBEB'  }}>{component}</div>);
	}
}