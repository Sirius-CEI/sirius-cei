import React, { Component } from 'react';
import {
  Route,
  Redirect,
	Switch,
	withRouter
} from 'react-router-dom';
// import { connect } from 'react-redux';

//Protected Components
import ProtectedRoute from './ProtectedRoute';

//Non Protected Components
import AdminHome from '../Admin/AdminHome';
import IndicatorPage from '../IndicatorPage/IndicatorPage';

class AdminRoutes extends Component {
  render() {
    return (
			<Switch>
				<Route exact path="/admin" component={AdminHome} />
				<Route path="/:outcome" component={IndicatorPage} />						
				<Redirect exact from="/" to="/macro-indicators" />
				<Route render={() => <Redirect to="/macro-indicators" />} />
			</Switch>
		)
  }
}

export default withRouter(AdminRoutes);
