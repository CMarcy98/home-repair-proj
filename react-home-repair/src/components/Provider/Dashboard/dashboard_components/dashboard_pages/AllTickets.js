import React, { Component } from 'react';
import axios from 'axios';
import Ticket from '../Ticket';

export default class AllTickets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tickets: []
		}
	}

	// Component runs this function before it renders to the page
	componentWillMount() {
		axios.get(`http://localhost:8000/tickets?provId=${localStorage.getItem('userId')}`)
			.then(res => {
				this.setState({ tickets: res.data.tickets });
				console.log('Result for tickets:', res.data.tickets);
			})
			.catch(err => {
				console.log('Error:', err);
			});
	}

	// Renders this code at runtime
	render() {
		const noTickets = <div>There are no tickets.</div>;
		const tickets = this.state.tickets.map((ticket) => {
			return <Ticket key={ticket._id} ticket={ticket} />;
		});

		return (
			<div>
				<h2 style={{ marginTop: 0, fontWeight: '100', backgroundColor: 'white', padding: '18px 0 18px 5%' }}>All Tickets</h2>
				<div id="ticket_container" style={{ overflowY: 'auto', height: '650px' }}>
					{this.state.tickets.length > 0 ? tickets : noTickets}
				</div>
			</div>
		);
	}
}