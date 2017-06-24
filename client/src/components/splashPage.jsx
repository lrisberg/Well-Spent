import React from 'react';
import { Link } from 'react-router-dom';

export default class SplashPage extends React.Component {

  render() {
    return (
        <div className="jumbotron">
          <h1>It's not how much money you have</h1>
          <p className="lead">It's how you spend it.</p>
          <p>
            <Link to="/signup" className="btn btn-lg btn-success" href="#" role="button">Sign Up</Link>
          </p>
        </div>
    );
  }
}
