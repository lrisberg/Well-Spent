import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

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

      let datePurchased = moment(purchase.date).format("MMMM Do, YYYY");

      return (
        <tr key={purchase.id}>
          <td><Link to={purchasePath}>{purchase.name}</Link></td>
          <td>{purchase.category_name}</td>
          <td>${purchase.price}</td>
          <td>{datePurchased}</td>
        </tr>
      )
    });

    return (
      <div className="page">
        <h1 className="page-heading">Purchases</h1>
        <div className="page-buttons">
          <Link to="/purchases/new" className="btn btn-primary pull-right" role="button">Add Purchase</Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Date Purchased</th>
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
