import React, { Component } from 'react';
import MyProfile from './Pages/MyProfile';
import ActiveTickets from "./Pages/ActiveTickets";
import AllTickets from "./Pages/AllTickets";
import CustomerHome from "./Pages/CustomerHome";

export default class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: {
				'My Profile': <MyProfile />,
				'Active Tickets': <ActiveTickets/>,
        'All Tickets': <AllTickets/>,
        'Home Page': <CustomerHome/>
			}
		}
	}

	render() {
		let component = this.state.items[this.props.component];

		return (<div style={{ width: '85vw' }}>{component}</div>);
	}
}
