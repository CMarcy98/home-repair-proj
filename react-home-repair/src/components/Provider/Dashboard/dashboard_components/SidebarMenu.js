import React, { Component } from 'react';
import './SidebarMenu.css';

export default class SidebarMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: ['My Profile', 'Open Tickets', 'All Tickets', 'Home']
		}
	}

	render() {
		const itemStyle = {
			paddingTop: '8%',
			height: '65px',
			cursor: 'pointer'
		}

		let items = this.state.items.map((title) => {
			return <div key={title} onClick={() => {this.props.handleChange(title)}} style={itemStyle}>{title}</div>;
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