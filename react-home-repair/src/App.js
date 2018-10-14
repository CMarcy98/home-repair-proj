import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import './App.css';
import Root from './components/Root';
import HomePage from './components/HomePage';
import SignUpPage from './components/Customer/SignUpPage';
import ProviderPage from './components/ProviderPage';
import IndexPage from './components/IndexPage';
import LoginPage from "./components/Customer/LoginPage";
import CustomerHomePage from './components/Customer/HomePage';
import Auth from './auth/Auth';

const CustomerPrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		Auth.loginStatus === true
			? <Component {...props} />
			: <Redirect to='/customer/login' />
	)} />
)

class App extends Component {
  render() {
  	console.log('Session storage', sessionStorage);
    return (
      <BrowserRouter>
        <Root>
					<Route exact path={"/"} component={IndexPage} />
					<Route path={"/customer/signup"} component={SignUpPage} />
					<Route path={"/customer/login"} component={LoginPage} />
					<CustomerPrivateRoute path={"/customer/home"} component={CustomerHomePage} />
					{/*<Route path={"/customer/home"} component={CustomerHomePage} />*/}
					<Route path={"/provider"} component={ProviderPage} />
				</Root>
      </BrowserRouter>
    );
  }
}

export default App;
