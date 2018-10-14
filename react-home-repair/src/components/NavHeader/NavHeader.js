import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router';

import './NavHeader.css';

export default class NavHeader extends Component {
	constructor() {
		super();
		this.state = {
			redirect: false
		}
	}

	render() {
		if(this.state.redirect === true) {
			return (<Redirect to='/' />);
		}

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
								<MenuItem eventKey={3.1}>Login</MenuItem>
							</LinkContainer>
							<LinkContainer to="/customer/signup">
								<MenuItem eventKey={3.2}>Sign Up</MenuItem>
							</LinkContainer>
							<MenuItem onClick={() => { this.signUserOut() }}>Sign Out</MenuItem>
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
		this.setState({ redirect: true });
	}
}
