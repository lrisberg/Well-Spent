import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    axios.post('/api/tokens', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      this.props.onLogin(response.data);
      this.props.history.push('/dashboard');
    })
    .catch((error) => {
      console.error(error);
    })
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
            <div className="panel panel-default panel-login">
              <div className="panel-body">
                <h3 className="text-center">Login to Well Spent</h3>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.handleChangePassword} className="form-control" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-primary pull-right">Log In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default withRouter(LoginPage);
