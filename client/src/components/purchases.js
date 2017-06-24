import React from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <h1>Purchases</h1>
        <Link to="/purchases/new">Add a purchase</Link>
      </div>
    );
  };
}
