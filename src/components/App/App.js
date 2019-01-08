import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

//Protected Components
import AdminHome from '../Admin/AdminHome';
import PasswordReset from '../LoginPage/passwordReset';

//Non Protected Components
import IndicatorPage from '../IndicatorPage/IndicatorPage';
import AnnualRelease from '../AnnualRelease/AnnualRelease';
import Footer from '../Footer/Footer';

import Nav from '../Nav/Nav';
import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
    this.props.dispatch({type: 'FETCH_CSV'});
  }

  render() {

    return (
      <Router>
        <div>
        <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            {/* <Redirect exact from="/" to="/home" /> */}
            <Route
              exact
              path="/home"
              component={AnnualRelease}
            />
            <Route
              exact
              path="/macro"
              component={IndicatorPage}
            />
            <Route
              exact
              path="/economic-development"
              component={IndicatorPage}
            />
            <Route
              exact
              path="/human-capital"
              component={IndicatorPage}
            />
            <Route
              exact
              path="/access-transit"
              component={IndicatorPage}
            />
            <ProtectedRoute
              exact
              path="/admin"
              component={AdminHome}
            />
            <Route
              exact
              path="/reset/:token"
              component={PasswordReset}
            />
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

const mapReduxStateToProps = reduxState => ({
  csv: reduxState.csv,
});

export default connect(mapReduxStateToProps)(App);
