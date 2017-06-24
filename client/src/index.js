import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './components/loginPage.jsx';
import SignupPage from './components/signupPage.jsx'
import SplashPage from './components/splashPage.jsx'
import Navbar from './components/navBar.jsx'
import Dashboard from './components/dashboard.jsx'
import Purchases from './components/purchases.jsx'
import AddPurchaseForm from './components/addPurchaseForm.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('token')
    }

    this.saveToken = this.saveToken.bind(this);
    this.destroyToken = this.destroyToken.bind(this);
  }

  saveToken(token) {
    localStorage.setItem('token', token);
    this.setState({
      token: token
    });
  }

  destroyToken() {
    localStorage.removeItem('token');
    this.setState({
      token: null
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar loggedIn={this.state.token !== null} onSignOut={this.destroyToken}/>
          <div>
            <Route exact path="/" component={SplashPage}/>
            <Route path="/signup" component={SignupPage}/>
            <Route path="/login" render={(props) => <LoginPage onLogin={this.saveToken} />}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route exact path="/purchases" component={Purchases}/>
            <Route exact path="/purchases/new" component={AddPurchaseForm}/>
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
