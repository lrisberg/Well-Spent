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
        <tr key={purchase.id}>
          <td><Link to={purchasePath}>{purchase.name}</Link></td>
          <td>{purchase.category_name}</td>
        </tr>
      )
    });

    return (
      <div className="page">
        <h1>Purchases</h1>
        <div className="page-buttons">
          <Link to="/purchases/new" className="btn btn-primary pull-right" role="button">Add Purchase</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Category</td>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  };
}
