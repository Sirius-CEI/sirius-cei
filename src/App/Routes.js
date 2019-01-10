import React, { Component } from 'react';
import {
  Route,
  Redirect,
	Switch,
	withRouter
} from 'react-router-dom';
// import { connect } from 'react-redux';
import PasswordReset from '../components/PasswordReset';

//Protected Components
// import ProtectedRoute from './ProtectedRoute';

//Non Protected Components
import AdminHome from '../views/Admin';
import IndicatorPage from '../views/IndicatorPage/IndicatorPage';

class Routes extends Component {
  render() {
    return (
			<Switch>
				<Route exact path="/admin" component={AdminHome} />
				<Route exact path="/reset/:token" component={PasswordReset} />						
				<Route path="/:outcome" component={IndicatorPage} />						
				<Redirect exact from="/" to="/macro-indicators" />
				<Route render={() => <Redirect to="/macro-indicators" />} />
			</Switch>
		)
  }
}

export default withRouter(Routes);
