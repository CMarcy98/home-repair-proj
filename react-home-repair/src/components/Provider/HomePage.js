import React, { Component } from 'react';
import SidebarMenu from './SidebarMenu';

export default class HomePage extends Component {
	render() {
		return (
			<div>
				<SidebarMenu />
				<div style={{ display: 'inline-block' }}>Div 2</div>
			</div>
		);
	}
}