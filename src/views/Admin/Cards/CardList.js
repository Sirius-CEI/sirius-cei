import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	Card,
	CardHeader,
	CardContent,
	CardMedia,
	CardActions,
	Typography,
	Button,
	Grid
} from '@material-ui/core';

import EditCard from './Card.edit';
import { apiAction } from '../../../redux/actions'

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

const deleteCard = (id, dispatch, apiAction) => {
	const args = {
		baseUrl: "/api/cards",
		method: "DELETE",
		id: id,
		label: "CARDS",
	}
	dispatch(apiAction(args));
}

const CardList = ({ classes, cards, outcome, dispatch }) => {
	const outcomeCards = cards.filter(card => card.outcome_id === outcome._id);

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
									<EditCard card={cardItem} />
									<Button
										onClick={()=>deleteCard(cardItem._id, dispatch, apiAction)}
										color="primary"
									>
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