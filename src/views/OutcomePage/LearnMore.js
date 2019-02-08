import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
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
		padding: theme.spacing.unit * 2,
		backgroundColor: 'white',
	},
	spacing: {
		padding: theme.spacing.unit,
		height: '100%',
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
		minWidth: 280,
		opacity: 1,
		padding: theme.spacing.unit,
	},
	title: {
		color: 'black',
		opacity: 1,
		margin: theme.spacing.unit,
	},
	titleBox: {
		width: '100%',
		backgroundColor: 'white',
		opacity: 0.8,
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
			<Grid container spacing={0} className={classes.cardContainer}>
					{outcomeCards && outcomeCards.map((cardItem, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} className={classes.spacing} key={cardItem._id}>
							<Card>
								<CardActionArea href={cardItem.url} target="blank">
									<CardMedia
										image={cardItem.image}
										title={cardItem.title}
										className={classnames(classes.card, classes.media)}
									 >
									 <div className={classnames(classes.titleBox)}>
										<Typography variant="h5" align="center" className={classes.title}>
											{cardItem.title}
										</Typography>
										</div>
										<Chip
											clickable
											color="default"
											label="learn more"
											style={{
												opacity: 1
											}}
										/>
									</CardMedia>	
								</CardActionArea>
							</Card>
						</Grid>
					))}
					<Grid item className={classes.grow} />
				</Grid>
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
