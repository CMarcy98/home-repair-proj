import React, { Component } from 'react';

const providerStyle = {
	margin: '20px 5%',
	backgroundColor: 'white',
	padding: '6px',
	borderRadius: '8px',
	boxShadow: '-3px 3px 4px rgba(0, 0, 0, 0.5)'
};


export default class ProviderModel extends Component {
  constructor(props) {
    super(props);
    this.state={
      provider: []
    }
  }

  componentWillMount(){

  }

render(){
  const {address, city, state, zipCode} = this.props.provider;
  const addressLine= `${address} ${city} ${state} ${zipCode}`;
  const username = `${this.props.provider.username}`;
  const {firstName, lastName}= this.props.provider;
  const nameLine = `${firstName} ${lastName}`;
  const email = `${this.props.provider.email}`;
  const phoneNumber = `${this.props.provider.phoneNumber}`;

  return (
    <div style={providerStyle}>
      {/*top of div will have name, username and address*/}
      <div style={{display:'flex'}}>
      {/*Name*/}
        <div style={{width:'100%', paddingLeft:'10px'}}>
          <div style={{fontSize: '21px', fontWeight:600}}>{nameLine}</div>
          <div style={{fontSize: '21px', fontWeight:600}}>{username}</div>
          <div style={{fontSize: '21px', fontWeight:600}}>{addressLine}</div>
        </div>
      </div>

    </div>

  )
}

}
