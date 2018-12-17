import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import TicketModal from "./TicketModal";

const ticketStyle = {
	margin: '20px 5%',
	backgroundColor: 'white',
	padding: '100px',
	borderRadius: '8px',
	boxShadow: '-3px 3px 3px 4px rgba(0, 0, 0, 0.5)'
};

export default class Ticket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			provider: [],
			customer: [],
			showModal: false,
			authorIds: []
		}
	}

	componentWillMount() {
		// Logic to find all unique authors in the comment sections
		const uniqueIds = [...new Set(this.props.ticket.comments.map(comment => comment.author))];
		this.setState({ authorIds: uniqueIds });
	}

	render() {
		// Build address string from ticket object passed in
		const { address, city, state, zipCode } = this.props.ticket;
		const addressLine = `${address} ${city} ${state}, ${zipCode}`;
		const ticketNum = `#${this.props.ticket._id}`;
		const colorObj = {
			orange: '#FFAA0D',
			green: '#4DBD33'
		};
		const color = this.props.ticket.status === 0 ? colorObj['orange'] : colorObj['green'];

		return (
			<div style={ticketStyle}>
				{/* Top div to hold ticket number, status, address and description */}
				<div style={{ display: 'flex' }}>
					{/* Ticket Number and Status code */}
					<div style={{ width: '10%' }}>
						<div>{ticketNum}</div>
						<div style={{ backgroundColor: color, color: 'white', textAlign: 'center' }}>{ this.props.ticket.status === 0 ? 'OPEN' : 'CLOSED' }</div>
					</div>

					{/* Address and description */}
					<div style={{ width: '100%', paddingLeft: '10px' }}>
						<div style={{ fontSize: '21px', fontWeight: 600 }}>{addressLine}</div>
						<div style={{ fontSize: '1.1em', color: '#525252' }}>{this.props.ticket.description}</div>
					</div>
				</div>

				{/* Div to hold all the bottom information such as assignee and customer in question */}
				<div style={{ display: 'flex' }}>
					<div style={{ display: 'flex', width: '10%', textAlign: 'center', height: '30px' }}>
						<div style={{ width: '30%' }}><FontAwesomeIcon icon="star"/></div>
						<div style={{ width: '30%' }}><FontAwesomeIcon icon="thumbtack"/></div>
						<div style={{ width: '40%' }}><FontAwesomeIcon icon="comment-alt"/></div>
					</div>
					{/* Right div */}
					<div style={{ width: '90%', display: 'flex' }}>
						<div style={{ width: '30%', paddingLeft: '6%', display: 'flex' }}>
							<div>
								<div style={{ fontWeight: 100 }}>assigned to</div>
								<div>Christian Marcy</div>
							</div>
						</div>
						<div style={{ width: '25%' }}>
							<div>
								<div style={{ fontWeight: 100 }}>assigned from</div>
								<div>{this.props.ticket.firstName} {this.props.ticket.lastName}</div>
							</div>
						</div>
						<div style={{ width: '20%', margin: 'auto' }}>
							<Button onClick={() => {this.setState({ showModal: true })}} bsSize="xsmall" bsStyle="info">More Info</Button>
						</div>
					</div>
				</div>

				{/* Modal popup of customer ticket information */}
				<TicketModal authorIds={this.state.authorIds} showModal={this.state.showModal} ticket={this.props.ticket} handleClose={() => {this.setState({ showModal: false })}}/>
			</div>
		);
	}
}
