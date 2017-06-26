import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class AddPurchaseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: 0,
      date: '',
      categories: null
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/categories')
      .then((response) => {
        this.setState({
          categories: response.data
        })
        console.log(this.state.categories);
      })
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleChangePrice(event) {
    this.setState({
      price: event.target.value
    });
  }

  handleChangeDate(event) {
    this.setState({
      date: event.target.value
    });
  }

  handleSubmit(event) {
    axios.post('/api/purchases', {
      name: this.state.name,
      price: this.state.price,
      date: this.state.date
    })
    .then((response) => {
      this.props.history.push('/purchases');

    })
    .catch((error) => {
      console.error(error);
    })
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" placeholder="Item Name" />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input value={this.state.price} onChange={this.handleChangePrice} type="number" className="form-control" placeholder="Price (e.g. '10.24')" />
          </div>

          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Choose Category
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li>Action</li>
              <li>Another action</li>
              <li>Something else here</li>
            </ul>
          </div>

          <div className="form-group">
            <label>Date Purchased</label>
            <input type="date" value={this.state.date} onChange={this.handleChangeDate} className="form-control" placeholder="Date purchased" />
          </div>
          <button type="submit" className="btn btn-default">Add Purchase</button>
        </form>
      </div>
    )
  }
}

export default withRouter(AddPurchaseForm);
