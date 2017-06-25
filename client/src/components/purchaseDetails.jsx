import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

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

    const happinessRows = this.state.purchase.happiness.map((happiness) => {
      let formattedDate = moment.utc(happiness.created_at).format('dddd MMMM Do');
      return (
        <tr key={happiness.id}>
          <td>
            {formattedDate}
          </td>
          <td>
            {happiness.happiness}
          </td>
        </tr>
      )
    })

    let happinessAlert = null;
    if (this.state.purchase.promptForHappiness) {
      let addHappinessPath = `/purchases/${this.state.purchase.id}/happiness/new`;
      happinessAlert = (
        <div className="alert alert-info" role="alert">
          <Link to={addHappinessPath}>Time to add happiness!</Link>
        </div>
      )
    }

    return (
      <div>
        <h1>{purchaseName} Details</h1>
        {happinessAlert}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Happiness</th>
              </tr>
            </thead>
            <tbody>
              {happinessRows}
            </tbody>
          </table>
      </div>
    )
  }
}
