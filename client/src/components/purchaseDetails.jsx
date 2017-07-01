import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis
} from 'recharts';
import { scaleTime } from 'd3-scale';

import {
  happinessTicks,
  happinessFormatter,
  makeDailyTimelineTicks,
  dayMonthFormatter
} from '../charting';


export default class PurchaseDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      purchase: null,
      happiness: null
    };
  };

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

    // let formattedDate = moment.utc(happiness.created_at).format('dddd MMMM Do');

    let happinessAlert = null;
    if (this.state.purchase.promptForHappiness) {
      let addHappinessPath = `/purchases/${this.state.purchase.id}/happiness/new`;
      happinessAlert = (
        <div className="alert alert-info" role="alert">
          <Link to={addHappinessPath}>This purchase is ready for your input.</Link>
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

    let ticks = makeDailyTimelineTicks(chartData[0].time, chartData[chartData.length - 1].time)

    let chart = (
      <LineChart width={800} height={400} data={chartData}>
        <Line type="monotone" dataKey="happiness" stroke="#8884d8" />
        <XAxis scale={scale} dataKey="time" tickFormatter={dayMonthFormatter} ticks={ticks}/>
        <YAxis dataKey="happiness" ticks={happinessTicks} tickFormatter={happinessFormatter}/>
      </LineChart>
    )

    return (
      <div>
        <h1>{purchaseName} Details</h1>
        {happinessAlert}
        {chart}
      </div>
    )
  }
}
