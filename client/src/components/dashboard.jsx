import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';
import { scaleTime } from 'd3-scale';

import {
  happinessTicks,
  happinessFormatter,
  makeDailyTimelineTicks,
  dayMonthFormatter
} from '../charting';

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

    let top5Chart = null;
    let worst5Chart = null;
    if (this.state.dashboard) {
      let happinessPerPurchaseData = this.state.dashboard.avgHappinessPerPurchase.filter((data) => data.happiness !== null);
      let top5Data = happinessPerPurchaseData.slice(0, 5);
      let worst5Data = happinessPerPurchaseData.slice((happinessPerPurchaseData.length - 5), happinessPerPurchaseData.length)
      worst5Data.reverse();
      top5Chart =
      <ResponsiveContainer>
        <BarChart data={top5Data}>
          <XAxis dataKey="name" />
          <YAxis dataKey="happiness" ticks={happinessTicks} tickFormatter={happinessFormatter} />
          <Bar type="monotone" dataKey="happiness" barSize={30} fill="#196DB6"/>
        </BarChart>
      </ResponsiveContainer>

      worst5Chart =
      <ResponsiveContainer>
        <BarChart data={worst5Data}>
        <XAxis dataKey="name" />
        <YAxis dataKey="happiness" ticks={happinessTicks} tickFormatter={happinessFormatter} />
        <Bar type="monotone" dataKey="happiness" barSize={30} fill="#196DB6" />
      </BarChart>
    </ResponsiveContainer>
    }

    let averageHappinessOverTimeChart = null;
    if (this.state.dashboard) {
      let averageHappinessOverTimeData = this.state.dashboard.avgHappinessOverTime.map((happiness) => {
        return {
          happiness: happiness.happiness,
          date: moment(happiness.date),
          time: moment(happiness.date).toDate().getTime()
        };
      });

      const scale = scaleTime();

      let ticks = makeDailyTimelineTicks(averageHappinessOverTimeData[0].time, averageHappinessOverTimeData[averageHappinessOverTimeData.length - 1].time);

      averageHappinessOverTimeChart = (
        <ResponsiveContainer>
          <LineChart data={averageHappinessOverTimeData}>
            <Line type="monotone" dataKey="happiness" stroke="#196DB6" />
            <XAxis dataKey="time" ticks={ticks} scale={scale} tickFormatter={dayMonthFormatter} />
            <YAxis dataKey="happiness" ticks={happinessTicks} tickFormatter={happinessFormatter} />
          </LineChart>
        </ResponsiveContainer>
      )
    }

    let averageHappinessByCategoryChart = null;
    if (this.state.dashboard) {
      let averageHappinessByCategoryData = this.state.dashboard.avgHappinessByCategory.map((happiness) => {
        return {
          category: happiness.category,
          happiness: happiness.happiness
        }
      })
      averageHappinessByCategoryChart =
      <ResponsiveContainer>
        <BarChart data={averageHappinessByCategoryData}>
          <XAxis dataKey="category" />
          <YAxis dataKey="happiness" ticks={happinessTicks} tickFormatter={happinessFormatter} />
          <Bar type="monotone" dataKey="happiness" barSize={30} fill="#196DB6" />
        </BarChart>
      </ResponsiveContainer>
    }

    return (
      <div>
        <h1>Dashboard</h1>
        {happinessAlert}
        <div className="row">
          <div className="col-md-12">
            <h4>Average Happiness Over Time</h4>
            <div className="dashboard-chart">
              {averageHappinessOverTimeChart}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h4>Your Top Five Purchases</h4>
            <div className="dashboard-chart">
              {top5Chart}
            </div>
          </div>
          <div className="col-md-6">
            <h4>Your Worst Five Purchases</h4>
            <div className="dashboard-chart">
              {worst5Chart}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4>Average Happiness By Category</h4>
            <div className="dashboard-chart">
              {averageHappinessByCategoryChart}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
