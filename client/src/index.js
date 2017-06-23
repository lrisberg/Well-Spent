import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const appName = (
  <div className="container">
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Well Spent</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
        </div>
      </div>
    </nav>
  </div>
);

ReactDOM.render(
  appName,
  document.getElementById('root')
);
