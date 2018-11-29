import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comment from './Comment';
// import MapContainer from 'components/map';
import GoogleMap from 'components/GoogleMap';

export default class TicketModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: "",
			ticket: this.props.ticket
		}


		this.keyPress = this.keyPress.bind(this);
	}

	render() {
		const ticket = this.state.ticket;
		const comments = ticket.comments.map((comment) => {
			return <Comment key={Math.floor(Math.random() * 1000)} comment={comment} />
		});

		return (
			<Modal show={this.props.showModal} onHide={this.props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title><strong>Ticket #{ticket._id} Details</strong></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Location information will include mao and detailed address and distance from provider*/}

					<div>
						<h4>Location Information</h4>
						<hr />

						<GoogleMap />
					</div>

					{/* Description of problem stated by the customer who submitted the problem */}
					<h4>Additional Information</h4>
					<hr />
					<p>{ticket.description}</p>

					<hr />

					{/* Messages section where user can input messages and see comments */}
					<div>
						{/*Header*/}
						<p style={{fontSize: '16px'}}>Comments</p>

						{/*Div that holds the comments section*/}
						<div style={{ color: 'flex' }}>

							{/* Area allows user to add comment */}
							<div>
								<div style={{display: 'flex'}}>
									<div style={{width: '10%', marginLeft: '10px'}}><FontAwesomeIcon style={{height: '35px', width: '35px'}} icon="user-circle"/></div>
									{/* Text area for user input */}
									<Form style={{width: '90%'}}>
										<FormGroup>
											<FormControl value={this.state.comment} onChange={(e) => {this.setState({comment: e.target.value})}} onKeyDown={this.keyPress} type="textarea" placeholder="Add a comment..."/>
										</FormGroup>
									</Form>
								</div>
								<div style={{paddingLeft: '82%', paddingBottom: '10px'}}>
									<Button onClick={() => {this.submitComment()}} bsStyle="primary" bsSize="small">Post Comment</Button>
								</div>
							</div>

							{/* Add all comments below the comment box */}
							<div style={{paddingLeft: '20%'}}>
								{comments}
							</div>
						</div>
					</div>

				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	// Allows the user to post a comment when they hit enter
	keyPress(e) {
		if(e.keyCode === 13) {
			e.preventDefault();
			this.submitComment();
		}
	}

	// Submits comment to the server to store in the database
	submitComment() {
		const comment = {
			author: localStorage.getItem('userId'),
			content: this.state.comment
		}

		axios.post(`http://localhost:8000/tickets/${this.state.ticket._id}/comments`, comment)
			.then(res => {
				// Assign data from the server and reset the comment field to reset it
				this.setState({
					ticket: res.data.ticket,
					comment: ""
				});
			})
			.catch(err => {
				console.log('Error:', err);
			});
	}
}