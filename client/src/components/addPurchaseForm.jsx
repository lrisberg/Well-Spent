import React from 'react';


export default class AddPurchaseForm extends React.Component {

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label>Item Name</label>
            <input type="text" className="form-control" placeholder="Item Name" />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="text" className="form-control" placeholder="Price" />
          </div>
          <div className="form-group">
            <label>Date Purchased</label>
            <input type="date" className="form-control" placeholder="Date purchased" />
          </div>
          <button type="submit" className="btn btn-default">Add Purchase</button>
        </form>
      </div>
    )
  }
}
