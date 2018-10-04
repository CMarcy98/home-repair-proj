import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Root from './components/Root';
import HomePage from './components/HomePage';
import CustomerPage from './components/CustomerPage';
import ProviderPage from './components/ProviderPage';
import IndexPage from './components/IndexPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Root>
					<Route exact path={"/"} component={IndexPage} />
					<Route path={"/home"} component={HomePage} />
					<Route path={"/customer"} component={CustomerPage} />
					<Route path={"/provider"} component={ProviderPage} />
				</Root>
      </BrowserRouter>
    );
  }
}

export default App;
