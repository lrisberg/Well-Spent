import React from 'react';
import axios from 'axios';

export default class SignupPage extends React.Component {
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
    axios.post('/api/users', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      this.props.history.push('/dashboard');
    })
    .catch((error) => {
      console.error(error);
    })
    event.preventDefault();
  }

  isFormValid() {
    if (this.state.email === null || this.state.email === '') {
      return false;
    }
    else if (!this.state.email.match(/.+@.+/)) {
      return false;
    }
    else if (this.state.password === null || this.state.password.length <= 7) {
      return false;
    }
    else {
      return true;
    }
  }

  render() {

    const isValid = this.isFormValid();

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
            <div className="panel panel-default panel-login">
              <div className="panel-body">
                <h3 className="text-center">Create a New Account</h3>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.handleChangePassword} className="form-control" placeholder="Password" />
                  </div>
                  <button disabled={!isValid} type="submit" className="btn btn-primary pull-right">Create Account</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
