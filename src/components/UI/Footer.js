import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
		flexGrow: 1,
		margin: theme.spacing.unit * 3,
	},
	container: {
		
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: 180,
		width: 280,
	},
});

class Footer extends Component {
	state = null;

	render() {
		const { classes, outcomeAreas } = this.props;
		return (
			<footer className={classes.root}>
				<Grid container spacing={24} className={classes.container} justify="center">
					{outcomeAreas === null ? null : outcomeAreas.map((outcome, index) => (
						<Grid item key={index}>
							<Card>
								<CardActionArea component={Link} to={outcome.route}>
									<CardMedia
										image={`images${outcome.route}.jpeg`}
										title={outcome.title}
										className={classes.card}
									>
										<div />
										<Typography variant="h5" align="center">{outcome.title}</Typography>
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
			</footer>
		)
	}
};

Footer.propTypes = {
  classes: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
	outcomeAreas: state.outcomes,
})

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
)(Footer)
