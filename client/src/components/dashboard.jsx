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
  YAxis
} from 'recharts';
import { scaleTime } from 'd3-scale';

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

    let yAxisTicks = [1, 4, 7];
    let yAxisFormatter = (happiness) => {
      if (happiness === 1) {
        return "☹️";
      }
      else if (happiness === 4) {
        return "😐"
      }
      else if (happiness === 7) {
        return "🙂"
      }
      return happiness;
    };

    let top5Chart = null;
    let worst5Chart = null;
    if (this.state.dashboard) {
      let happinessPerPurchaseData = this.state.dashboard.avgHappinessPerPurchase.filter((data) => data.happiness !== null);
      let top5Data = happinessPerPurchaseData.slice(0, 5);
      let worst5Data = happinessPerPurchaseData.slice((happinessPerPurchaseData.length - 5), happinessPerPurchaseData.length)
      worst5Data.reverse();
      top5Chart = <BarChart width={600} height={300} data={top5Data}>
        <XAxis dataKey="name" />
        <YAxis dataKey="happiness" ticks={yAxisTicks} tickFormatter={yAxisFormatter} />
        <Bar type="monotone" dataKey="happiness" barSize={30} fill="#8884d8"/>
      </BarChart>

      worst5Chart = <BarChart width={600} height={300} data={worst5Data}>
        <XAxis dataKey="name" />
        <YAxis dataKey="happiness" ticks={yAxisTicks} tickFormatter={yAxisFormatter} />
        <Bar type="monotone" dataKey="happiness" barSize={30} fill="#8884d8" />
      </BarChart>
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

      const tickFormatDate = (timeValue) => {
        console.log(timeValue);
        return moment(timeValue).format('MM/DD');
      };
      const scale = scaleTime();

      function tickMaker(firstVal, lastVal) {
        let ticks = [];
        let tick = firstVal;
        const lastTickValue = lastVal;
        while (lastTickValue > tick) {
          ticks.push(tick);
          tick += 86400000;
        }
        return ticks;
      }

      let ticks = tickMaker(averageHappinessOverTimeData[0].time, averageHappinessOverTimeData[averageHappinessOverTimeData.length - 1].time);

      let yAxisTicks = [1, 4, 7];
      let yAxisFormatter = (happiness) => {
        if (happiness === 1) {
          return "☹️";
        }
        else if (happiness === 4) {
          return "😐"
        }
        else if (happiness === 7) {
          return "🙂"
        }
        return happiness;
      };

      averageHappinessOverTimeChart = (
        <LineChart width={800} height={400} data={averageHappinessOverTimeData}>
          <Line type="monotone" dataKey="happiness" stroke="#8884d8" />
          <XAxis dataKey="time" ticks={ticks} scale={scale} tickFormatter={tickFormatDate} />
          <YAxis dataKey="happiness" ticks={yAxisTicks} tickFormatter={yAxisFormatter} />
        </LineChart>
      )
    }

    return (
      <div>
        <h1>Dashboard</h1>
        {happinessAlert}
        <h4>Average Happiness Over Time</h4>
        {averageHappinessOverTimeChart}
        <h4>Your Top Five Purchases</h4>
        {top5Chart}
        <h4>Your Worst Five Purchases</h4>
        {worst5Chart}
      </div>
    );
  }
}
