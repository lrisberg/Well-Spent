import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  LineChart,
  Line,
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

    // const averageHappinessOverTimeData = this.state.dashboard.averageHappinessOverTime

    // let averageHappinessOverTimeChart = (
    //   <LineChart width={800} height={400} data={averageHappinessOverTimeData}>
    //     <Line type="monotone" dataKey="happiness" stroke="#8884d8" />
    //     <XAxis dataKey="time" />
    //     <YAxis domain={[0.5, 7.5]} dataKey="happiness" />
    //   </LineChart>
    // )

    return (
      <div>
        <h1>Dashboard</h1>
        {happinessAlert}
        <h4>Average Happiness Over Time</h4>
      </div>
    );
  }
}
