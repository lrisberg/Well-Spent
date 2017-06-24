import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {

  render() {
    let signUpButton = null;
    let logInButton = null;
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
    }

    return (
      <div className="header clearfix">
        <nav>
          <ul className="nav nav-pills pull-right">
            <li role="presentation">
              <Link to="/splash">Splash</Link>
            </li>
            {signUpButton}
            {logInButton}
          </ul>
        </nav>
        <h3 className="text-muted">Well Spent</h3>
      </div>
    )
  }
}
