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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('token')
    }

    this.saveToken = this.saveToken.bind(this);
  }

  saveToken(token) {
    localStorage.setItem('token', token);
    this.setState({
      token: token
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar loggedIn={this.state.token !== null} />
          <div>
            <Route path="/splash" component={SplashPage}/>
            <Route path="/signup" component={SignupPage}/>
            <Route path="/login" render={(props) => <LoginPage onLogin={this.saveToken} />}/>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
