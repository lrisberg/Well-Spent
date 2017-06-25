import React from 'react';
import axios from 'axios';

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
        console.log(purchaseResponse);
        this.setState({
          purchase: purchaseResponse.data
        });
      });
  }

  render() {
    if (this.state.purchase === null) {
      return (<div></div>)
    }
    let purchaseName = this.state.purchase.name;

    const happinessRows = this.state.purchase.happiness.map((happiness) => {
      return (
        <tr key={happiness.id}>
          <td>
            {happiness.created_at}
          </td>
          <td>
            {happiness.happiness}
          </td>
        </tr>
      )
    })

    return (
      <div>
        <h1>{purchaseName} Details</h1>
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
