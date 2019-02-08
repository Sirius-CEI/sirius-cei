import React, { Component } from 'react';
import {
  Route,
  Redirect,
	Switch,
	withRouter
} from 'react-router-dom';
import PasswordReset from '../components/PasswordReset';

//Protected Components
import ProtectedRoute from './ProtectedRoute';

//Non Protected Components
import AdminHome from '../views/Admin';
import OutcomePage from '../views/OutcomePage';

class Routes extends Component {
  render() {
    return (
			<Switch>
				<Route path="/reset/:token" component={PasswordReset} />						
				<Route path="/:outcome" component={OutcomePage} />		
				<ProtectedRoute path="/admin" component={AdminHome} />			
				<Redirect exact from="/" to="/macro-indicators" />
				<Route render={() => <Redirect to="/macro-indicators" />} />
			</Switch>
		)
  }
}

export default withRouter(Routes);
