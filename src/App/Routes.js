import React, { Component } from 'react';
import {
  Route,
  Redirect,
	Switch,
	withRouter
} from 'react-router-dom';
// import { connect } from 'react-redux';

//Protected Components
// import ProtectedRoute from './ProtectedRoute';

//Non Protected Components
import AdminHome from '../views/Admin';
import OutcomePage from '../views/OutcomePage';

class Routes extends Component {
  render() {
    return (
			<Switch>
				<Route exact path="/admin" component={AdminHome} />
				<Route path="/:outcome" component={OutcomePage} />						
				<Redirect exact from="/" to="/macro-indicators" />
				<Route render={() => <Redirect to="/macro-indicators" />} />
			</Switch>
		)
  }
}

export default withRouter(Routes);
