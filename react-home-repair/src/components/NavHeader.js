import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class NavHeader extends Component {
	render() {
		return (
			<Navbar style={{marginBottom: 0}} inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Raccoon Repair</Link>
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
							<LinkContainer to="/customer/ticket">
								<MenuItem>Create a work repair ticket</MenuItem>
							</LinkContainer>
							<LinkContainer id="sign-out-button" to="/">
								<MenuItem onClick={() => {this.signUserOut()}}>Sign Out</MenuItem>
							</LinkContainer>
						</NavDropdown>

						{/* Provider Dropdown*/}
						<NavDropdown eventKey={4} title="Provider" id="basic-nav-dropdown">
							<LinkContainer to="/provider/login">
								<MenuItem>Login</MenuItem>
							</LinkContainer>
							<LinkContainer to="/provider/signup">
								<MenuItem>Sign Up</MenuItem>
							</LinkContainer>
							<LinkContainer to="/provider/home">
								<MenuItem>Home Page</MenuItem>
							</LinkContainer>
							<LinkContainer id="sign-out-button" to="/">
								<MenuItem onClick={() => {this.signUserOut()}}>Sign Out</MenuItem>
							</LinkContainer>
						</NavDropdown>
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
