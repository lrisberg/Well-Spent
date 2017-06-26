import React from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <h4>Most Well-Spent Categories</h4>
        <h4>Most Well-Spent Dollars</h4>
        <h4>Percent of Money Spent on Meaningful Purchases</h4>
      </div>
    );
  }
}
