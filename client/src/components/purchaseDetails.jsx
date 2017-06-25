import React from 'react';
import axios from 'axios';

export default class PurchaseDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      purchase: null
    };
  };

  componentDidMount() {
    let purchaseId = this.props.match.params.id;

    axios.get(`/api/purchases/${purchaseId}`)
      .then((purchaseResponse) => {
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

    return (
      <div>
        <h1>{purchaseName} Details</h1>
      </div>
    )
  }
}
