import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './NavHeader.css';

export default class NavHeader extends Component {
	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Home Repair</Link>
					</Navbar.Brand>
					<Navbar.Toggle/>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavDropdown eventKey={3} title="Customer" id="basic-nav-dropdown">

							<LinkContainer to="/customer/login">
								<MenuItem>Login</MenuItem>
							</LinkContainer>

							<LinkContainer to="/customer/signup">
								<MenuItem>Sign Up</MenuItem>
							</LinkContainer>

							<LinkContainer id="sign-out-button" to="/">
								<MenuItem onClick={() => {this.signUserOut()}}>Sign Out</MenuItem>
							</LinkContainer>
						</NavDropdown>

						<LinkContainer to="/provider">
							<NavItem eventKey={2}>Providers</NavItem>
						</LinkContainer>

					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}

	// Signs user out by redirecting them back to the home page and clearing the user's id out
	// of the local storage
	signUserOut() {
		console.log('Signing user out now');
		localStorage.removeItem('userId');
	}
}
