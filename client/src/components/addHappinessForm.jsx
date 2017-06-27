import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddHappinessForm extends React.Component {
  constructor() {
    super();
    this.state = {
      purchase: null,
      happiness: 0
    };

    this.handleChangeHappiness = this.handleChangeHappiness.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChangeHappiness(event) {
    this.setState({
      happiness: event.target.value
    });
  }

  handleSubmit(event) {
    const purchaseId = this.props.match.params.id;
    axios.post(`/api/purchases/${purchaseId}/happiness`, {
      happiness: this.state.happiness
    })
    .then((response) => {
      this.props.history.push(`/purchases/${purchaseId}`);
    })
    event.preventDefault();
  }

  render() {
    let form;
    if (this.state.purchase === null) {
      form = null;
    }
    else {
      const productName = this.state.purchase.name;
      const productPrice = this.state.purchase.price;
      form = (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>You spent ${productPrice} on {productName}. Please record how much you agree with this statement in regards to your purchase: 'I feel that my money was well spent.'</label>
            <label className="radio"><input type="radio" name="optradio" value="1" onChange={this.handleChangeHappiness} checked={this.state.happiness === '1'} />Absolutely Disagree</label>
            <label className="radio"><input type="radio" name="optradio" value="2" onChange={this.handleChangeHappiness} checked={this.state.happiness === '2'} />Strongly Disagree</label>
            <label className="radio"><input type="radio" name="optradio" value="3" onChange={this.handleChangeHappiness} checked={this.state.happiness === '3'}/>Somewhat Disagree</label>
            <label className="radio"><input type="radio" name="optradio" value="4" onChange={this.handleChangeHappiness} checked={this.state.happiness === '4'}/>Neither Agree nor Disagree</label>
            <label className="radio"><input type="radio" name="optradio" value="5" onChange={this.handleChangeHappiness} checked={this.state.happiness === '5'}/>Somewhat Agree</label>
            <label className="radio"><input type="radio" name="optradio" value="6" onChange={this.handleChangeHappiness} checked={this.state.happiness === '6'}/>Strongly Agree</label>
            <label className="radio"><input type="radio" name="optradio" value="7" onChange={this.handleChangeHappiness} checked={this.state.happiness === '7'}/>Absolutely Agree</label>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      )
    }

    return (
      <div className="container">
        {form}
      </div>
    )
  }
}

export default withRouter(AddHappinessForm);
