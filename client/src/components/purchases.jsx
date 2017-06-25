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
      return (
        <div key={purchase.id} className="panel panel-default">
          <div className="panel-body">
            {purchase.name}
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
