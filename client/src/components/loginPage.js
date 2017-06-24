import React from 'react';

export default class LoginPage extends React.Component {

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default">Log In</button>
        </form>
      </div>
    );
  };
}
