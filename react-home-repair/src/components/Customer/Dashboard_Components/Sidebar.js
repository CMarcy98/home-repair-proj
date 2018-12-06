import React, { Component } from 'react';
import './Sidebar.css';

export default class Sidebar extends Component {
	constructor(props) {
		super(props);
		// console.log('Props', props);
		this.state = {
			items: ['My Profile', 'Active Tickets', 'All Tickets', 'Customer Home']
		}
	}

	render() {
		const itemStyle = {
			paddingTop: '8%',
			height: '65px',
			cursor: 'pointer'
		}

		let items = this.state.items.map((title) => {
			return <div className="menu-item" key={title} onClick={() => {this.props.handleChange(title)}} style={itemStyle}>{title}</div>;
		})

		return (
			<div style={{
					width: '15vw',
					height: '92vh',
					borderRight: '1px solid black',
					fontSize: '17px', fontWeight: 300,
					backgroundColor: '#565356',
					color: '#9f9ea0',
					paddingLeft: '20px'
				}}>
				{items}
			</div>
		);
	}
}
