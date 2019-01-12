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
	spacing: {
		padding: theme.spacing.unit
	},
	list: {
		display: 'flex',
		flexFlow: 'row wrap',
		alignItems: 'stretch',
		alignContent: 'flex-start',
		justifyContent:'center',
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'center',
		alignContent: 'center',
		height: '100%',
		width: '100%',
		minWidth: 280,
		minHeight: 180,
	},
	img: {
		height: 80
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
				<Grid container spacing={0} className={classes.spacing}>
					{outcomeCards.map((cardItem, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} className={classes.spacing} key={index}>
							<Card className={classes.card}>
								<CardMedia
									image={cardItem.image}
									title={cardItem.title}
									className={classes.img}
								/>
								<CardHeader
									title={cardItem.title}
									titleTypographyProps={{
										variant: "h6",
										align: "center",
										color: "primary"
									}}
								/>
								<CardContent className={classes.grow}>
									<Typography variant="body1" align="left">
										{cardItem.url}
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
					<Grid item className={classes.grow} />
				</Grid>
			</CardContent>
		</Card>
	)
}

const mapStateToProps = ({ cards }) => ({
	cards: cards
})

export default connect(mapStateToProps)(withStyles(styles)(CardList));