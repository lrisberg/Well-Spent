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
  dayMonthFormatter,
  happinessDomain,
  makeChartPanel
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

  getBestPurchaseData() {
    let data = this.state.dashboard.avgHappinessPerPurchase.filter((data) => data.happiness !== null);
    return data.slice(0, Math.ceil(data.length / 2));
  }

  getWorstPurchaseData() {
    let data = this.state.dashboard.avgHappinessPerPurchase.filter((data) => data.happiness !== null);
    data.reverse();
    return data.slice(0, Math.floor(data.length / 2));
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

    let bestChart = null;
    let worstChart = null;
    if (this.state.dashboard) {
      let bestData = this.getBestPurchaseData();
      bestChart = (
        <ResponsiveContainer>
          <BarChart data={bestData}>
            <XAxis dataKey="name" />
            <YAxis dataKey="happiness" domain={happinessDomain} ticks={happinessTicks} tickFormatter={happinessFormatter} />
            <Bar type="monotone" dataKey="happiness" barSize={30} fill="#196DB6"/>
          </BarChart>
        </ResponsiveContainer>
      )

      bestChart = makeChartPanel(bestChart, {title: "Your Best Purchases"});

      let worstData = this.getWorstPurchaseData();
      worstChart = (
        <ResponsiveContainer>
          <BarChart data={worstData}>
          <XAxis dataKey="name" />
          <YAxis dataKey="happiness" domain={happinessDomain} ticks={happinessTicks} tickFormatter={happinessFormatter} />
          <Bar type="monotone" dataKey="happiness" barSize={30} fill="#196DB6" />
        </BarChart>
      </ResponsiveContainer>
      )

      worstChart = makeChartPanel(worstChart, {title: "Your Worst Purchases"});
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
            <YAxis dataKey="happiness" domain={happinessDomain} ticks={happinessTicks} tickFormatter={happinessFormatter} />
          </LineChart>
        </ResponsiveContainer>
      )

      averageHappinessOverTimeChart = makeChartPanel(averageHappinessOverTimeChart, {title: "Average Satisfaction Over Time"})
    }

    let averageHappinessByCategoryChart = null;
    if (this.state.dashboard) {
      let averageHappinessByCategoryData = this.state.dashboard.avgHappinessByCategory.map((happiness) => {
        return {
          category: happiness.category,
          happiness: happiness.happiness
        }
      })
      averageHappinessByCategoryChart = (
        <ResponsiveContainer>
          <BarChart data={averageHappinessByCategoryData}>
            <XAxis dataKey="category" />
            <YAxis dataKey="happiness" domain={happinessDomain} ticks={happinessTicks} tickFormatter={happinessFormatter} />
            <Bar type="monotone" dataKey="happiness" barSize={30} fill="#196DB6" />
          </BarChart>
        </ResponsiveContainer>
      )

      averageHappinessByCategoryChart = makeChartPanel(averageHappinessByCategoryChart, {title: "Average Satisfaction By Category"})
    }

    return (
      <div>
        <h1>Dashboard</h1>
        {happinessAlert}
        <div className="row">
          <div className="col-md-12">
            {averageHappinessOverTimeChart}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {bestChart}
          </div>
          <div className="col-md-6">
            {worstChart}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {averageHappinessByCategoryChart}
          </div>
        </div>
      </div>
    );
  }
}
