import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Purchases extends React.Component {
  constructor() {
    super();
    this.state = {
      purchases: null
    }
  }

  componentDidMount() {
    axios.get('/api/purchases')
    .then((response) => {
      this.setState({
        purchases: response.data
      });
    })
  }

  render() {
    const purchases = this.state.purchases || [];
    const rows = purchases.map((purchase) => {
      let purchasePath = `/purchases/${purchase.id}`;
      return (
        <div key={purchase.id} className="panel panel-default">
          <div className="panel-body">
            <Link to={purchasePath}>{purchase.name}</Link>
          </div>
        </div>
      )
    });

    return (
      <div>
        <h1>Purchases</h1>
        <Link to="/purchases/new">Add a purchase</Link>
        {rows}
      </div>
    );
  };
}
