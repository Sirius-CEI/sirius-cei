import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import AdminHome from '../views/Admin';

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

const ProtectedRoute = props => {
	const { user, ...otherProps } = props;
	return <Route exact path="/admin" render={(props) => <AdminHome {...otherProps} open={!user._id} /> } />
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(ProtectedRoute)