import React from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {

  render() {
    return (
      <div className="jumbotron">
        <h1>Dashboard</h1>
        <Link to="/purchases">Purchases</Link>
      </div>
    );
  }
}
