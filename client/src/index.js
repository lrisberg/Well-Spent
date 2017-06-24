import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import ReactDOM from 'react-dom';
import './index.css';

class LandingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className="jumbotron">
          <h1>It's not how much money you have</h1>
          <p className="lead">It's how you spend it.</p>
          <p>
            <a className="btn btn-lg btn-success" href="#" role="button">Sign Up</a>
          </p>
        </div>
    );
  }
}

class SignupPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
        </form>
      </div>
    );
  };
}

class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="header clearfix">
        <nav>
          <ul className="nav nav-pills pull-right">
            <li role="presentation">
              <Link to="/splash">Sploosh</Link>
            </li>
            <li role="presentation">
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
        <h3 className="text-muted">Well Spent</h3>
      </div>
    )
  }
}

ReactDOM.render(
  <Router>
    <div className="container">
      <Navbar />
      <div>
        <Route path="/splash" component={LandingPage}/>
        <Route path="/signup" component={SignupPage}/>
      </div>
    </div>
  </Router>,
  document.getElementById('root')
);
