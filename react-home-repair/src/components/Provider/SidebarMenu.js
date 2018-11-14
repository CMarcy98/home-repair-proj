import React, { Component } from 'react';

export default class SidebarMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: ['My Profile', 'Open Tickets', 'All Tickets', 'Provider Home']
		}
	}

	render() {
		const itemStyle = {
			textAlign: 'center',
			padding: '25px 0',
			borderBottom: '1px solid black'
		}

		let items = this.state.items.map((title) => {
			return <div key={title} onClick={() => {this.props.handleChange(title)}} style={itemStyle}>{title}</div>;
		})

		return (
			<div style={{ width: '15vw', height: '100vh', borderRight: '1px solid black' }}>
				{items}
			</div>
		);
	}
}