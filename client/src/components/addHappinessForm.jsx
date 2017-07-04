import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

class AddHappinessForm extends React.Component {
  constructor() {
    super();
    this.state = {
      purchase: null,
      happiness: null,
      remainingIds: null
    };

    this.handleChangeHappiness = this.handleChangeHappiness.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    let parsed = queryString.parse(this.props.location.search);
    let remainingArray = !parsed.remaining ? [] : parsed.remaining.split(',');

    this.setState({
      remainingIds: remainingArray
    })

    let purchaseId = this.props.match.params.id;

    axios.get(`/api/purchases/${purchaseId}`)
      .then((purchaseResponse) => {
        this.setState({
          purchase: purchaseResponse.data,
        });
      });
  }

  handleChangeHappiness(event) {
    this.setState({
      happiness: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const purchaseId = this.props.match.params.id;
    axios.post(`/api/purchases/${purchaseId}/happiness`, {
      happiness: this.state.happiness
    })
    .then((response) => {
      if (this.state.remainingIds.length === 0) {
        this.props.history.push(`/purchases/${purchaseId}`);
      }
      else {
        let nextId = this.state.remainingIds[0];
        let remaining = this.state.remainingIds.slice(1).join(',');
        window.location = `/purchases/${nextId}/happiness/new?remaining=${remaining}`;
      }
    })
  }

  isFormValid() {
    if (this.state.happiness === null) {
      return false;
    }
    else {
      return true;
    }
  }

  render() {
    let form;
    if (this.state.purchase === null) {
      form = null;
    }
    else {
      const productName = this.state.purchase.name;
      const productPrice = this.state.purchase.price;
      const isValid = this.isFormValid();
      form = (
        <div>
          <div>
            <div className="fact fact-details">
              You spent <strong>${productPrice}</strong> on <strong>{productName}</strong>. Please record how much you agree with the following statement:
            </div>
            <div className="fact fact-quote">
              'I feel that my money was well spent.'
            </div>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="radio"><input type="radio" name="optradio" value="7" onChange={this.handleChangeHappiness} checked={this.state.happiness === '7'}/>Absolutely Agree</label>
              <label className="radio"><input type="radio" name="optradio" value="6" onChange={this.handleChangeHappiness} checked={this.state.happiness === '6'}/>Strongly Agree</label>
              <label className="radio"><input type="radio" name="optradio" value="5" onChange={this.handleChangeHappiness} checked={this.state.happiness === '5'}/>Somewhat Agree</label>
              <label className="radio"><input type="radio" name="optradio" value="4" onChange={this.handleChangeHappiness} checked={this.state.happiness === '4'}/>Neither Agree nor Disagree</label>
              <label className="radio"><input type="radio" name="optradio" value="3" onChange={this.handleChangeHappiness} checked={this.state.happiness === '3'}/>Somewhat Disagree</label>
              <label className="radio"><input type="radio" name="optradio" value="2" onChange={this.handleChangeHappiness} checked={this.state.happiness === '2'} />Strongly Disagree</label>
              <label className="radio"><input type="radio" name="optradio" value="1" onChange={this.handleChangeHappiness} checked={this.state.happiness === '1'} />Absolutely Disagree</label>

            </div>
            <button disabled={!isValid} type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
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
