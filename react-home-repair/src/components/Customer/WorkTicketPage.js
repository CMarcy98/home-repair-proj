import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import WorkTicketForm from "./WorkTicketForm";

export default class WorkTicketPage extends Component {
	render() {
		return (
			<div className="container">
				<Panel>
					<Panel.Heading>
						<Panel.Title className="text-center" componentClass="h1">Customer Work Ticket</Panel.Title>
					</Panel.Heading>
					<Panel.Body>
						<WorkTicketForm/>
					</Panel.Body>
				</Panel>
			</div>
		);
	}
}
