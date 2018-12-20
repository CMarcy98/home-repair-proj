import React, { Component } from 'react';
import axios from 'axios';
import ProviderModel from '../ProviderModel';

export default class AllProviders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			providers: []
		}
	}

componentWillMount() {
  axios.get('http://localhost:8000/providers')
    .then(res => {
      this.setState({providers: res.data.providers });
      console.log('Result for providers:', res.data.providers);
    })
    .catch(err => {
      console.log('Error:', err);
    });
}

render() {
  const noProviders = <div>There are no providers.</div>;
  const providers = this.state.providers.map((provider) => {
    return <ProviderModel key={provider._id} provider={provider} />;
  });

  return (
    <div>
      <h2 style={{ marginTop: 0, fontWeight: '100', backgroundColor: 'white', padding: '18px 0 18px 5%' }}>All Providers</h2>
      <div id="provider_container" style={{ overflowY: 'auto', height: '650px' }}>
        {this.state.providers.length > 0 ? providers : noProviders}
      </div>
    </div>
  );
}
}
