import React, { Component } from 'react';
import NavHeader from "./NavHeader/NavHeader";

export default class Root extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<NavHeader/>
				</div>
				{this.props.children}
			</div>
		);
	}
}