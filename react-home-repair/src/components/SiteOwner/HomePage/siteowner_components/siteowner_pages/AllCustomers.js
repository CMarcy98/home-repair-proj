import React, { Component } from 'react';
import axios from 'axios';
import CustomerModel from '../CustomerModel';

export default class AllCustomers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		}
	}

componentWillMount() {
  axios.get('http://localhost:8000/users')
    .then(res => {
      this.setState({users: res.data.users });
      console.log('Result for customers:', res.data.users);
    })
    .catch(err => {
      console.log('Error:', err);
    });
}

render() {
  const noUsers = <div>There are no customers.</div>;
  const users = this.state.users.map((user) => {
    return <CustomerModel key={user._id} user={user} />;
  });

  return (
    <div>
      <h2 style={{ marginTop: 0, fontWeight: '100', backgroundColor: 'white', padding: '18px 0 18px 5%' }}>All Customers</h2>
      <div id="customer_container" style={{ overflowY: 'auto', height: '650px' }}>
        {this.state.users.length > 0 ? users : noUsers}
      </div>
    </div>
  );
}
}
