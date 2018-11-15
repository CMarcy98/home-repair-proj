import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

const ticketStyle = {
	margin: '20px 5%',
	backgroundColor: 'white',
	padding: '6px',
	borderRadius: '8px',
	boxShadow: '-3px 3px 4px rgba(0, 0, 0, 0.5)'
};

export default class Ticket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			provider: [],
			customer: [],
			clicked: false
		}
	}

	componentWillMount() {
		// console.log('Pull provider and customer data from somewhere!', this.props.ticket);
	}

	render() {
		// Build address string from ticket object passed in
		const { address, city, state, zipCode } = this.props.ticket;
		const addressLine = `${address} ${city} ${state}, ${zipCode}`;
		const ticketNum = `#${this.props.ticket._id}`;
		const colorArray = ['#365EFF', '#FFAA0D', "#4DBD33"];
		const backColor = colorArray[Math.floor(Math.random() * colorArray.length)];

		return (
			<div style={ticketStyle}>
				{/* Top div to hold ticket number, status, address and description */}
				<div style={{ display: 'flex' }}>
					{/* Ticket Number and Status code */}
					<div style={{ width: '10%' }}>
						<div>{ticketNum}</div>
						<div style={{ backgroundColor: backColor, color: 'white', textAlign: 'center' }}>OPEN</div>
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
						<div style={{ width: '20%', margin: 'auto' }}><Button onClick={() => {this.setState({ clicked: !this.state.clicked })}} bsSize="xsmall" bsStyle="info">More Info</Button></div>
					</div>
				</div>
			</div>
		);
	}
}