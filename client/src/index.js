import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import ReactDOM from 'react-dom';
import './index.css';

const landingPage = (
  <div className="container">
    <div class="header clearfix">
      <nav>
        <ul className="nav nav-pills pull-right">
          <li role="presentation" className="active">
            <a href="#">Home</a>
          </li>
          <li role="presentation">
            <a href="#">About</a>
          </li>
          <li role="presentation">
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <h3 className="text-muted">Well Spent</h3>
    </div>
    <div className="jumbotron">
      <h1>It's not how much money you have</h1>
      <p className="lead">It's how you spend it.</p>
      <p>
        <a className="btn btn-lg btn-success" href="#" role="button">Sign Up</a>
      </p>
    </div>
  </div>
);

ReactDOM.render(
  landingPage,
  document.getElementById('root')
);
