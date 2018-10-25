import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

export default class IndexPage extends Component {
	render() {
		return (
			<div className="container">
				<Jumbotron>
					<h1>Home Repair Ticketing System</h1>
					<p>
						This is a home repair website to connect customers who have problems in their home with competent people who can fulfill their household problems.
					</p>
					<p>
						<Button bsStyle="primary">Learn more</Button>
					</p>
				</Jumbotron>
			</div>
		);
	}
}