import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class Navbar extends React.Component {
  constructor() {
    super();

    this.signOutFunc = this.signOutFunc.bind(this);
  }

  signOutFunc() {
    this.props.onSignOut();
    this.props.history.push('/');
  }

  render() {
    let signUpButton = null;
    let logInButton = null;
    let signOutButton = null;
    let purchasesButton = null;
    let dashboardButton = null;
    let downloadButton = null;
    if (!this.props.loggedIn) {
      signUpButton = (
        <li role="presentation">
          <Link to="/signup">Sign Up</Link>
        </li>
      )
      logInButton = (
        <li role="presentation">
          <Link to="/login">Log In</Link>
        </li>
      )
    } else {
      signOutButton = (
        <li role="presentation">
          <a onClick={this.signOutFunc}>Sign Out</a>
        </li>
      )
      purchasesButton = (
        <li role="presentation">
          <Link to="/purchases">Purchases</Link>
        </li>
      )
      dashboardButton = (
        <li role="presentation">
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )
      downloadButton = (
        <li role="presentation">
          <a href="/downloads/chrome-extension.crx">Download Chrome Extension</a>
        </li>
      )
    }

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-ws-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Well Spent</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-ws-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              {downloadButton}
              {dashboardButton}
              {purchasesButton}
              {signUpButton}
              {logInButton}
              {signOutButton}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar);
