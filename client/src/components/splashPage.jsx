import React from 'react';
import { Link } from 'react-router-dom';

export default class SplashPage extends React.Component {

  render() {
    return (
      <div>
        <div className="splash-hero">
          <div className="container">
            <div className="hero-body">
              <h1>It's not how much you spend</h1>
              <p className="lead">It's how you spend that matters.</p>
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
                  <p>See your satisfaction with your purchases displayed over time and category. See what really makes you happy and what doesn't.</p>
                  <img className="img-thumbnail" src="/images/chart.png" />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Amazon Integration</h4>
                </div>
                <div className="panel-body">
                  <p>Track online purchases easily. Seamlessly add orders from Amazon with a click of a button using the Well Spent Chrome Extension.</p>
                  <img className="img-thumbnail" src="/images/amazon.png" />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>Smart Notifications</h4>
                </div>
                <div className="panel-body">
                  <p>Be notified when it's time to add more data. Our timed notification schedules offer you the most insightful graphs.</p>
                  <img className="img-thumbnail" src="/images/notification.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
