import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

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

const AdminHomeButton = ({ classes }) => (
  <Button variant="outlined" component={Link} to="/admin">
    Admin Home
		<FontAwesomeIcon icon="home" className={classes.rightIcon} />
  </Button>
);

AdminHomeButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminHomeButton);