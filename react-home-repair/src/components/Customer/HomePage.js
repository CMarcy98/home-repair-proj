import React, { Component } from 'react';
import Sidebar from './Dashboard_Components/Sidebar';

export default class IndexPage extends Component {
	render() {
		return (
			<div>
				<Sidebar />
				<div style={{ display: 'inline-block' }}>Div 2</div>
			</div>
		);
	}
}
