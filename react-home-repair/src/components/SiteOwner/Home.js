import React, { Component } from 'react';
import AllTickets from '../Provider/Dashboard/dashboard_components/dashboard_pages/AllTickets.js';


export default class Home extends Component {
render() {
  return (
    <div>
      <h1>Site Owner Home Page</h1>
      <h5>Hello this is the Site Owner Home Page</h5>
      <AllTickets />
    </div>
  );
}
}
