import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardMedia, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
		flexGrow: 1,
		padding: theme.spacing.unit * 2,
	},
	spacing: {
		padding: theme.spacing.unit,
	},
	cardContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: 180,
		width: 280,
		backgroundColor: theme.palette.grey[800],
	},
	title: {
		color: theme.palette.grey[100]
	},
	media: {
		opacity: 0.5
	},
});

const LearnMore = ({ classes, outcomeId, cards }) => {
	const outcomeCards = cards.filter(card => (card.outcome_id === outcomeId))
	
	return (
		<div className={classes.root}>
			<div className={classes.spacing}>
				<Typography
					align="center"
					variant="h4"
					color="secondary"
				>
					Learn More
				</Typography>
			</div>
			<div className={classes.cardContainer}>
					{outcomeCards && outcomeCards.map((cardItem, index) => (
						<div className={classes.spacing}>
							<Card>
								<CardActionArea>
									<CardMedia
										image={cardItem.image}
										title={cardItem.title}
										className={classes.card}
									>
										<Typography variant="h5" align="center" className={classes.title}>
											{cardItem.title}
										</Typography>
										<Chip
											clickable
											color="default"
											label="learn more"
										/>
									</CardMedia>
								</CardActionArea>
							</Card>
						</div>
					))}
				</div>
			</div>
	)
}

LearnMore.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	cards: state.cards,
})

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
)(LearnMore)
