import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';

//Protected Components
import ProtectedRoute from './ProtectedRoute';
import AdminHome from '../Admin/AdminHome';

//Non Protected Components
import IndicatorPage from '../IndicatorPage/IndicatorPage';
import Footer from '../UI/Footer';
import Nav from '../UI/Nav';
import './App.css';

import outcomeAreas from '../../redux/outcome-areas'

class App extends Component {
  componentDidMount () {
		// this.props.dispatch({type: 'FETCH_USER'})
		this.props.dispatch({ type: 'SET_OUTCOME_AREAS', payload: outcomeAreas });
  }

  render() {

    return (
      <Router>
        <div>
        	<Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/macro-indicators" />
            <Route
              exact
              path="/macro-indicators"
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
            <Route render={() => <Redirect to="/macro-indicators" />} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
