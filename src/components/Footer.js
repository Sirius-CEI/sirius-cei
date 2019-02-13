import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Grid,
	Typography,
	AppBar,
	Toolbar,
	IconButton
} from '@material-ui/core';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const styles = theme => ({
	bottomNav: {
		top: 'auto',
		bottom: 0,
		padding: theme.spacing.unit,
	},
	bottomNavText: {
		color: '#fff',
		fontWeight: theme.typography.fontWeightLight,
		textTransform: 'uppercase',
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	}
});

class Footer extends Component {
	render() {
		const { classes, user } = this.props;
		return (
			<footer>
				<AppBar position="static" color="primary" elevation={0} className={classes.bottomNav}>
					<Toolbar disableGutters>
						<Grid container spacing={16} justify="center" alignItems="center">
							<Grid item>
								<Typography variant="body1" align="center" className={classes.bottomNavText}>
									<FontAwesomeIcon icon="phone" className={classes.leftIcon} />(612) 351-8200
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1" align="center" className={classes.bottomNavText}>
									<FontAwesomeIcon icon="at" className={classes.leftIcon} />info@CenterForEconomicInclusion.org
								</Typography>
							</Grid>
								<Grid container direction="row" justify="flex-end" alignItems="center">
									<Grid item>
										{!user._id ? <LoginButton /> : <LogoutButton />}
									</Grid>
									{!!user._id && 
										<Grid item>
											<IconButton component={Link} to="/admin">
												<FontAwesomeIcon icon="home" size="sm" />
											</IconButton>
										</Grid>
									}
								</Grid>
							</Grid>
					</Toolbar>
				</AppBar>
			</footer>
		)
	}
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
})

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
)(Footer)