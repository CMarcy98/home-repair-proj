import React from 'react';

const ticketStyle = {
	padding: '20px 10%'
};

const Ticket = (props) => {
	return (
		<div style={ticketStyle}>
			<h4>Ticket</h4>
			<div>id: {props.ticket._id}</div>
			<div>First Name: {props.ticket.firstName}</div>
			<div>Description of problem: {props.ticket.description}</div>
		</div>
	);
}

export default Ticket;