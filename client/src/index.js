import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './components/loginPage.js';
import SignupPage from './components/signupPage.js'
import SplashPage from './components/splashPage.js'
import Navbar from './components/navBar.js'

ReactDOM.render(
  <Router>
    <div className="container">
      <Navbar />
      <div>
        <Route path="/splash" component={SplashPage}/>
        <Route path="/signup" component={SignupPage}/>
        <Route path="/login" component={LoginPage}/>
      </div>
    </div>
  </Router>,
  document.getElementById('root')
);
