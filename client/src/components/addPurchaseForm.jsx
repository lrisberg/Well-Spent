import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

class AddPurchaseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: 0,
      date: '',
      categories: null,
      category: null
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    let parsed = queryString.parse(this.props.location.search);
    this.setState({
      name: parsed.name || '',
      price: parsed.price || 0,
      date: parsed.date || ''
    });
    axios.get('/api/categories')
      .then((response) => {
        this.setState({
          categories: response.data,
          category: response.data[1]
        })
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

  selectCategory(category) {
    this.setState({
      category: category
    })
  }

  handleSubmit(event) {
    axios.post('/api/purchases', {
      name: this.state.name,
      price: this.state.price,
      date: this.state.date,
      category_id: this.state.category.id
    })
    .then((response) => {
      this.props.history.push('/purchases');

    })
    .catch((error) => {
      console.error(error);
    })
    event.preventDefault();
  }

  isFormValid() {
    if (this.state.name === null || this.state.name === '') {
      return false;
    }
    else if (this.state.price <= 0) {
      return false;
    }
    else if (this.state.date === null || this.state.date === '') {
      return false;
    }
    else if (this.state.category === null) {
      return false;
    }
    else {
      return true;
    }
  }

  render() {
    const categories = this.state.categories || [];
    const categoryRows = categories.map((category) => {
      const clickHandler = (event) => {
        this.selectCategory(category);
      };


      return (
        <li key={category.id}>
          <a onClick={clickHandler}>{category.name}</a>
        </li>
      )
    });

    const selectedCategory = this.state.category === null ? 'Choose Category' : this.state.category.name;

    const isValid = this.isFormValid();

    return (
      <div className="container">
        <h1 className="page-heading">Add New Purchase</h1>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Item Name</label>
                <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" placeholder="e.g. Blender" />
              </div>
              <div className="form-group">
                <label>Price</label>
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input value={this.state.price} onChange={this.handleChangePrice} type="number" className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label>Date Purchased</label>
                <input type="date" value={this.state.date} onChange={this.handleChangeDate} className="form-control" placeholder="Date purchased" />
              </div>

              <div className="form-group">
                <label>Category</label>
                <div className="dropdown">
                  <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    {selectedCategory}
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {categoryRows}
                  </ul>
                </div>
              </div>
              <div className="page-buttons-inline">
                <button disabled={!isValid} type="submit" className="btn btn-primary">Add Purchase</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AddPurchaseForm);
