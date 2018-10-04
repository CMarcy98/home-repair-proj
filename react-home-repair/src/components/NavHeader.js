import React  from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

const NavHeader = (props) => {
	return (
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<Link to="/">Home Repair</Link>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem eventKey={1} href="#">
						<Link style={{ textDecoration: 'none', color: '#9d9d9d' }} to="/home">Home</Link>
					</NavItem>
				</Nav>
				<Nav pullRight>
					<NavItem eventKey={1}>
						<Link style={{ textDecoration: 'none', color: '#9d9d9d' }} to="/customer">Customers</Link>
					</NavItem>
					<NavItem eventKey={2}>
						<Link style={{ textDecoration: 'none', color: '#9d9d9d' }} to="/provider">Providers</Link>
					</NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavHeader;
