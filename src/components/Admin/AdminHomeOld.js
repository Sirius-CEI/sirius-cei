import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Other components
import ExtensionPanels from './ExtensionPanels/ExtensionPanels';
import LogOutButton from '../LogOutButton/LogOutButton';

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing.unit * 2,
		background: theme.palette.purple.light,
	},
});

class AdminHome extends Component {
  render() {
      const { classes, user } = this.props;   
      return (
        <div className={classes.root}>
					<Grid container spacing={16} className={classes.container}>
						<Grid item xs>
							<Typography variant="h6">{user.username}</Typography>
						</Grid>
					</Grid>
          <h1 className={classes.h1} id="welcome">
            Welcome, { this.props.user.username }
          </h1>
          <LogOutButton />
          <div className={classes.extensionPanels}>
            <ExtensionPanels />
          </div>
        </div>
      );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

AdminHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(AdminHome);