import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      dashboard: null
    };
  }

  componentDidMount() {
    axios.get('/api/dashboard')
    .then((response) => {
      this.setState({
        dashboard: response.data
      })
    })
  }

  render() {

    let happinessAlert = null;
    if (this.state.dashboard) {
      if (this.state.dashboard.numberOfNeedyPurchases > 0) {
        happinessAlert = (
          <div className="alert alert-info" role="alert">
            <Link to='/purchases'>You have {this.state.dashboard.numberOfNeedyPurchases} purchases ready for your input.</Link>
          </div>
        )
      }
    }

    return (
      <div>
        <h1>Dashboard</h1>
        {happinessAlert}
        <h4>Most Well-Spent Categories</h4>
        <h4>Most Well-Spent Dollars</h4>
        <h4>Percent of Money Spent on Meaningful Purchases</h4>
      </div>
    );
  }
}
