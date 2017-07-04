import React from 'react';
import { Link } from 'react-router-dom';

export default class SplashPage extends React.Component {

  render() {
    return (
      <div>
        <div className="splash-hero">
          <div className="container">
            <div className="hero-body">
              <h1>It's not how much money you have</h1>
              <p className="lead">It's how you spend it.</p>
              <p>
                <Link to="/signup" className="btn btn-lg btn-primary" href="#" role="button">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <h1 className="splash-heading">Features</h1>
          <div className="row">
            <div className="col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Emotive Visualizations</h4>
                </div>
                <div className="panel-body">
                  <p>See your satisfaction with your purchases displayed over time and category. See what makes you happy and what doesn't.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Amazon Integration</h4>
                </div>
                <div className="panel-body">
                  <p>Seamlessly add purchases from Amazon with a click of a button using our Chrome Extension.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Built-in Notifications</h4>
                </div>
                <div className="panel-body">
                  <p>Be notified when it's time to add more data. Never miss a data point again.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
