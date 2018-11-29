import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
	static defaultProps = {
		center: {
			lat: 39.707790,
			lng: -75.113831
		},
		zoom: 13
	};

	renderMarkers(map, maps) {
		let marker = new maps.Marker({
			position: {lat: 39.707790, lng: -75.113831},
			map,
			title: 'Hello World!'
		});
	}

	render() {
		const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '200px', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: `${API_KEY}`}}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
					onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
				>
					<AnyReactComponent
						lat={59.955413}
						lng={30.337844}
						text={'Kreyser Avrora'}
					/>
				</GoogleMapReact>
			</div>
		);
	}
}

export default GoogleMap;