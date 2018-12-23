import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

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
		const { outcomes } = this.props;
    return (
      <Router>
        <div>
        	<Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
						{!outcomes ? <IndicatorPage /> : outcomes.map((item, index) => (
							<Route key={index} path='/:id' component={IndicatorPage} />
						))}
            <ProtectedRoute
              exact
              path="/admin"
              component={AdminHome}
            />
            {/* <Redirect exact from="/" to="/macro-indicators" /> */}
            <Route render={() => <Redirect to="/macro-indicators" />} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(App);
