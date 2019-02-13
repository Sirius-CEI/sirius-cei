import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

import { apiAction } from '../redux/actions'

const styles = theme => ({
  root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
});

const logout = ( apiAction ) => {
	apiAction({
		baseUrl: "api/user",
		id: "logout",
		method: "POST",
		label: "USER"
	})
}

const LogoutButton = ({ classes, apiAction }) => (
  <Button variant="outlined" onClick={()=>logout(apiAction)} >
    Log Out
		<FontAwesomeIcon icon="sign-out-alt" className={classes.rightIcon} />
  </Button>
);

LogoutButton.propTypes = {
	classes: PropTypes.object.isRequired,
	apiAction: PropTypes.func.isRequired
};

export default compose(
	withRouter,
	connect(null, {apiAction}),
	withStyles(styles),
)(LogoutButton)