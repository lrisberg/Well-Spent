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
    let itemId = this.props.match.params.id;

    axios.get(`/api/purchases/${itemId}`)
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
    axios.post(`/api/purchases/${this.props.match.params.id}/happiness`, {
      happiness: this.state.happiness
    })
    .then((response) => {
      this.props.history.push('/dashboard');
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
      form = (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>How happy are you with your purchase of {productName}?</label>
            <input type="number" value={this.state.happiness} onChange={this.handleChangeHappiness} min="1" max="7" className="form-control" placeholder="enter a number between 1 - 7" />
          </div>
          <button type="submit" className="btn btn-default">Add Happiness</button>
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
