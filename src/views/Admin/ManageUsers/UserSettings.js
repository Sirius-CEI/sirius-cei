import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UpdatePassword from './EditPassword';
import UpdateEmail from './EditEmail';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

const UserSettings = props => (
	<div>
		<UpdatePassword />
		<UpdateEmail />
	</div>
)

UserSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSettings);