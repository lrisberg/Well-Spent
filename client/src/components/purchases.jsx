import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Purchases extends React.Component {

  componentDidMount() {
    axios.get('/api/purchases')
    .then((response) => {
      console.log(response);
    })
  }

  render() {
    return (
      <div>
        <h1>Purchases</h1>
        <Link to="/purchases/new">Add a purchase</Link>
      </div>
    );
  };
}
