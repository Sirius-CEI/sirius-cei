import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardMedia, CardActionArea, CardActions, Typography, Button, Grid, Divider } from '@material-ui/core';

import EditCard from './Card.edit';

const styles = theme => ({
  root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	list: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		minWidth: 280,
	},
	img: {
		height: '80'
	},
	actionButtons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end'
	}
});


const CardList = ({ classes, cards, outcome, dispatch }) => {
	const outcomeCards = cards.filter(card => card.outcome_id === outcome._id);
	const deleteCard = id => (
		dispatch({
			type: 'DELETE_CARD',
			payload: id
		})
	)

	return (
		<Card className={classes.root}>
			<CardHeader
				title={outcome.title}
			/>
			<CardContent className={classes.list}>
				<Grid container spacing={16}>
					{outcomeCards.map((cardItem, index) => (
						<Grid item key={index}>
							<Card className={classes.card}>
									<CardMedia
										image={cardItem.image}
										title={cardItem.title}
										className={classes.img}
									/>
									<CardContent>
										<Typography variant="h6" align="center" color="primary">
											{cardItem.title}
										</Typography>
									</CardContent>
								<CardActions className={classes.actionButtons}>
									<EditCard card={cardItem}/>
									<Button onClick={()=>deleteCard(cardItem._id)} color="primary">
										Delete
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</CardContent>
		</Card>
	)
}

const mapStateToProps = ({ cards }) => ({
	cards: cards
})

export default connect(mapStateToProps)(withStyles(styles)(CardList));