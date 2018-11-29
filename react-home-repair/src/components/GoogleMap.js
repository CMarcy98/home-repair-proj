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

	render() {
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '200px', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyD5OisjipZMcMtqiGVf_PdYQ9sIlmQjZW4"}}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
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