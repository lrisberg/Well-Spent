import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';

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
        console.log(this.state.dashboard);
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

    let happinessPerPurchaseChart = null;
    if (this.state.dashboard) {
      let happinessPerPurchaseData = this.state.dashboard.avgHappinessPerPurchase.filter((data) => data.happiness !== null);
      happinessPerPurchaseChart = <BarChart width={600} height={300} data={happinessPerPurchaseData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar type="monotone" dataKey="happiness" barSize={30} fill="#8884d8"/>
      </BarChart>
    }

    return (
      <div>
        <h1>Dashboard</h1>
        {happinessAlert}
        <h4>Average Happiness Over Time</h4>
        <h4>Happiness Per Purchase</h4>
        {happinessPerPurchaseChart}
      </div>
    );
  }
}
