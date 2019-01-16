import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = theme => ({
  root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	bottomNav: {
		top: 'auto',
		bottom: 0,
		boxShadow: 'none',
	},
	bottomNavText: {
		color: '#fff',
		fontWeight: theme.typography.fontWeightLight,
		textTransform: 'uppercase',
	},
	toolbar: {
		margin: 0,
		padding: theme.spacing.unit * 2,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	}
});

class Footer extends Component {
	render() {
		const { classes, user } = this.props;
		return (
			<footer className={classes.root}>
				<AppBar position="static" className={classes.bottomNav}>
					<Toolbar className={classes.toolbar}>
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
							<Grid item xs={12}>
								<Grid container spacing={8} direction="row" justify="flex-end" alignItems="center">
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
	outcomeAreas: state.outcomes,
	user: state.user,
})

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
)(Footer)
