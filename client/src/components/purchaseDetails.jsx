import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';
import { scaleTime } from 'd3-scale';

import {
  happinessTicks,
  makeDailyTimelineTicks,
  dayMonthFormatter,
  happinessDomain,
  makeChartPanel,
  HappinessAxisTick
} from '../charting';


export default class PurchaseDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      purchase: null,
      happiness: null
    };

    this.deletePurchaseFunc = this.deletePurchaseFunc.bind(this);
  };

  deletePurchaseFunc() {
    let purchaseId = this.props.match.params.id;
    axios.delete(`/api/purchases/${purchaseId}`)
      .then((response) => {
        this.props.history.push('/purchases');
      })

  }

  componentDidMount() {
    let purchaseId = this.props.match.params.id;
    if (isNaN(parseInt(purchaseId, 10))) {
      return;
    }
    axios.get(`/api/purchases/${purchaseId}`)
      .then((purchaseResponse) => {
        this.setState({
          purchase: purchaseResponse.data
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    if (this.state.purchase === null) {
      return (<div></div>)
    }
    let purchaseName = this.state.purchase.name;

    let enoughData = this.state.purchase.happiness.length > 1;
    let notEnoughDataAlert;
    if (!enoughData) {
      notEnoughDataAlert = (
        <div className="alert alert-warning" role="alert">
          <strong>Not enough data! </strong>
          <span>Once you have at least two data points we'll show you a cool chart.</span>
        </div>
      )
    }

    // let formattedDate = moment.utc(happiness.created_at).format('dddd MMMM Do');

    let happinessAlert = null;
    if (this.state.purchase.promptForHappiness) {
      let addHappinessPath = `/purchases/${this.state.purchase.id}/happiness/new`;
      happinessAlert = (
        <div className="alert alert-info" role="alert">
          <strong>It's data time! </strong> Click <Link to={addHappinessPath}>here</Link> to record more data.
        </div>
      )
    }

    const chartData = this.state.purchase.happiness.map((happiness) => {
        return {
          happiness: happiness.happiness,
          date: moment(happiness.created_at),
          time: moment(happiness.created_at).toDate().getTime()
        };
    });
    chartData.sort((h1, h2) => {
      return h1.date.diff(h2.date);
    });

    const scale = scaleTime();

    let ticks;
    if (chartData[0] === undefined) {
      console.log('undefiend!');
    }
    else {
      ticks = makeDailyTimelineTicks(chartData[0].time, chartData[chartData.length - 1].time)
    }
    let chart;
    if (enoughData) {
      chart = (
        <ResponsiveContainer>
          <LineChart width={800} height={400} data={chartData}>
            <Line type="monotone" dataKey="happiness" stroke="#196DB6" />
            <XAxis scale={scale} dataKey="time" tickFormatter={dayMonthFormatter} ticks={ticks}/>
            <YAxis dataKey="happiness" domain={happinessDomain} ticks={happinessTicks} tick={<HappinessAxisTick/>}/>
          </LineChart>
        </ResponsiveContainer>
      )
      chart = makeChartPanel(chart, {xaxis: 'Time', yaxis: 'Purchase Satisfaction'});
    }

    return (
      <div className="page">
        <h1 className="page-heading">{purchaseName}</h1>
        <div className="page-buttons">
          <a onClick={this.deletePurchaseFunc} className="btn btn-danger" role="button">Delete Purchase</a>
        </div>
        {happinessAlert}
        {notEnoughDataAlert}
        {chart}
      </div>
    )
  }
}
