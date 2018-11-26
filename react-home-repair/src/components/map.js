import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {}
		}
		// binding this to event-handler functions
		this.onMarkerClick = this.onMarkerClick.bind(this);
		this.onMapClick = this.onMapClick.bind(this);
	}

	onMarkerClick = (props, marker, e) => {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});
	}

	onMapClick = (props) => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	}

	render() {
		const style = {
			width: '90%',
			height: '100%'
		}

		return (
			<Map
				item
				style={style}
				xs = { 12 }
				google = { this.props.google }
				onClick = { this.onMapClick }
				zoom = { 14 }
				initialCenter = {{ lat: 39.648209, lng: -75.711185 }}
			>
				<Marker
					onClick = { this.onMarkerClick }
					title = { 'Changing Colors Garage' }
					position = {{ lat: 39.648209, lng: -75.711185 }}
					name = { 'Changing Colors Garage' }
				/>
				<InfoWindow
					marker = { this.state.activeMarker }
					visible = { this.state.showingInfoWindow }
				>
					<div>Hello</div>
				</InfoWindow>
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyCDx9bTDtex_1GmO7QHhgaDe_j675_zcv0"
})(MapContainer)