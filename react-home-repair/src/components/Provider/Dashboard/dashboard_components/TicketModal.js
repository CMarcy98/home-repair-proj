import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
// import MapContainer from 'components/map';

export default class TicketModal extends Component {
	render() {
		const ticket = this.props.ticket;

		return (
			<Modal show={this.props.showModal} onHide={this.props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title><strong>Ticket #{ticket._id} Details</strong></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Location information will include mao and detailed address and distance from provider*/}
					<h4>Location Information</h4>
					<hr />

					{/**/}

					{/* Description of problem stated by the customer who submitted the problem */}
					<h4>Customer Description</h4>
					<hr />
					<p>Customer Description is inserted here from API call</p>

					<hr />

					{/* Messages section where user can input messages */}
					<p style={{fontSize: '16px'}}>Messages</p>
					<div style={{ color: 'blue' }}>
						<p style={{border: '1px dotted grey'}}>Comment</p>
						<Form>
							<FormGroup>
								<FormControl onKeyDown={this.keyPress} type="text" placeholder="Add comment here..."/>
							</FormGroup>
						</Form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	keyPress(e) {
		if(e.keyCode === 13) {
			e.preventDefault();
			console.log(e.target.value);
		}
	}
}