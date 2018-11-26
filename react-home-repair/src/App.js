import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import './App.css';
import Root from './components/Root';
import IndexPage from './components/IndexPage';
import CustomerSignUpPage from './components/Customer/SignUpPage';
import CustomerLoginPage from './components/Customer/LoginPage';
import CustomerHomePage from './components/Customer/HomePage';
import WorkTicketForm from './components/Customer/WorkTicketPage';
import ProviderSignUpPage from './components/Provider/Signup/SignUpPage';
import ProviderLoginPage from './components/Provider/Login/LoginPage';
import ProviderHomePage from './components/Provider/Dashboard/Dashboard';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faThumbtack, faCommentAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';

require('dotenv').config();

library.add(faStar);
library.add(faThumbtack);
library.add(faCommentAlt);
library.add(faUserAlt);

const getLoginStatus = () => {
	return (localStorage.getItem('userId') !== null) ? true: false;
};

const CustomerPrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		getLoginStatus() === true
			? <Component {...props} />
			: <Redirect to={"/customer/login"} />
	)} />
);

const ProviderPrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		getLoginStatus() === true
			? <Component {...props} />
			: <Redirect to={"/provider/login"} />
	)} />
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Root>
					<Route exact path={"/"} component={IndexPage} />
					{/* Customer Routes */}
					<Route path={"/customer/signup"} component={CustomerSignUpPage} />
					<Route path={"/customer/login"} component={CustomerLoginPage} />
					<CustomerPrivateRoute path={"/customer/home"} component={CustomerHomePage} />
      		<CustomerPrivateRoute path={"/customer/ticket"} component={WorkTicketForm} />
					{/* Provider routes */}
					<Route path={"/provider/signup"} component={ProviderSignUpPage} />
					<Route path={"/provider/login"} component={ProviderLoginPage} />
					<ProviderPrivateRoute path={"/provider/home"} component={ProviderHomePage} />
				</Root>
      </BrowserRouter>
    );
  }
}

export default App;
