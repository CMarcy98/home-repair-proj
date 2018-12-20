import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comment from './Comment';
import GoogleMap from 'components/GoogleMap';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
// import MapContainer from 'components/map';

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
		const comments = ticket.comments.map((comment, index) => {
			return <Comment key={comment._id} comment={comment} index={index} />
		});

		return (
			<Modal show={this.props.showModal} onHide={this.props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title><strong>Ticket #{ticket._id} Details</strong></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Location information will include mao and detailed address and distance from provider*/}

					<div>
						<h4>Detailed Location Information</h4>
						<hr style={{margin: '0 0 10px 0'}}/>
						<h6><b>Address</b>: {ticket.address}</h6>
						<h6><b>City</b>: {ticket.city}</h6>
						<h6><b>State</b>: {ticket.state}</h6>
						<h6><b>Zip Code</b>: {ticket.zipCode}</h6>
						<GoogleMap />
					</div>

					{/* Description of problem stated by the customer who submitted the problem */}
					<div style={{paddingTop: '10%'}}>
						<h4>Description of Problem</h4>
						<hr style={{margin: '0 0 10px 0'}} />
						<p>{ticket.description}</p>
					</div>


					{/* Messages section where user can input messages and see comments */}
					<div style={{paddingTop: '10%'}}>
						{/*Header*/}
						<p style={{fontSize: '16px'}}>Comments</p>
						<hr style={{margin: '0 0 10px 0'}} />

						{/*Div that holds the comments section*/}
						<div style={{ color: 'flex' }}>

							{/* Area allows user to add comment */}
							<div>
								<div style={{display: 'flex'}}>
									<div style={{width: '10%', marginLeft: '10px'}}><FontAwesomeIcon style={{height: '35px', width: '35px'}} icon="user-circle"/></div>
									{/* Text area for user input */}
									<Form style={{width: '90%'}}>
										<FormGroup>
											<FormControl value={this.state.comment} onChange={(e) => {this.setState({comment: e.target.value})}} onKeyDown={(e) => {this.keyPress(e)}} type="text" placeholder="Add a comment..."/>
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

	// Responsible for sending the email to a specific user with message updating them that a new comment has arrived
	sendEmail(user) {
		// If the user is logged in and the email is in the user info passed in as the parameter, we do not need to notify them
		// via email because they are already logged in and submitting the comment....
		if(user._id !== localStorage.getItem('userId')) {
			// Update message here....
			const msg = "Updating the user that a new comment has been posted on the tciket you are involved in....";
			console.log('Sending email to:', user.email);

			// Post email to user via endpoint
			axios.post('http://localhost:8000/emails', {
				text: msg,
				email: user.email
			})
			.then(res => {
				console.log('Resulting info', res);
			})
			.catch(err => {
				console.log('Error:', err);
			});
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

		// We need to send emails to everyone who has a comment on this tickets
		// AKA find all the unique id's and send it to each person besides the person creating the comment
		// tips: When looping the array of comments ( wherever that is, make an object that is like array with the id's of authors)
		// add them to the oject/array if they are already not in it

		// We need to get the email information for the user and then send them an email after receiving their info from the api
		this.props.authorIds.forEach((authorId) => {
			// Get individual info about user
			axios.get(`http://localhost:8000/users/${authorId}`)
			.then(result => {
				if(result.data.user) {
					this.sendEmail(result.data.user);
				} else {
					// The author is a provider and we need to get his information
					axios.get(`http://localhost:8000/providers/${authorId}`)
					.then(res => {
						// We now have the user for sure
						this.sendEmail(res.data.provider);
					})
					.catch(err => {
						console.log('Error:', err);
					});
				}
			})
			.catch(err => {
				console.log('Error:', err);
			})
		});
	}
}
