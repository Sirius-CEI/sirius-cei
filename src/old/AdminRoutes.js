import React, { Component } from 'react';
import {
  Route,
  Redirect,
	Switch,
	withRouter
} from 'react-router-dom';
import adminPages from './adminPages';

class AdminRoutes extends Component {
  render() {
    return (
			<Switch>
				{adminPages.map((item, index) => (
					<Route key={index} path={`/admin${item.path}`} component={item.component} />
				))}
			</Switch>
		)
  }
}

export default withRouter(AdminRoutes);
