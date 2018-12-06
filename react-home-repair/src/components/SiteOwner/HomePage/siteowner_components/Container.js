import React, { Component } from 'react';
import AllCustomers from './siteowner_pages/AllCustomers';
import AllProviders from "./siteowner_pages/AllProviders";
import EveryTicket from "./siteowner_pages/EveryTicket";

export default class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: {
				'All Providers': <AllProviders />,
				'All Customers': <AllCustomers/>,
				'All Tickets': <EveryTicket/>
			}
		}
	}

	render() {
		let component = this.state.items[this.props.component];

		return (<div style={{ width: '85vw', height: '94vh', backgroundColor: '#EBEBEB'  }}>{component}</div>);
	}
}
