import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
	grow: {
		flexGrow: 1,
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: 180,
		width: 280,
	},
	text: {
		color: 'white'
	},
});

class FooterNav extends Component {
	render() {
		const { classes, outcomeAreas } = this.props;
		return (
			<nav className={classes.root}>
				<Grid container spacing={24} justify="center">
					<Grid item xs={12}>
						<Typography align="center" variant="h4" color="secondary">Learn More</Typography>
					</Grid>
					{outcomeAreas.map((outcome, index) => (
						<Grid item key={index}>
							<Card>
								<CardActionArea component={Link} to={outcome.route}>
									<CardMedia
										image={`images${outcome.route}.jpeg`}
										title={outcome.title}
										className={classes.card}
									>
										<div />
										<Typography variant="h5" align="center" color="inherit" className={classes.text}>{outcome.title}</Typography>
										<Chip
											clickable
											color="default"
											label="read more"
										/>
									</CardMedia>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			</nav>
		)
	}
};

FooterNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	outcomeAreas: state.outcomes,
})

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
)(FooterNav)
