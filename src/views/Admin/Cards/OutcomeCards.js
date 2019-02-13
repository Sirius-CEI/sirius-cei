import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
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
} from '@material-ui/core';

import EditCard from './Card.edit';
import { apiAction } from '../../../redux/actions';

const styles = theme => ({
	grow: {
		flexGrow: 1,
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

const deleteCard = (cardItem, apiAction) => (
	apiAction({
		baseUrl: "/api/cards",
		method: "DELETE",
		id: cardItem._id,
		label: "CARDS",
	})
)

const OutcomeCards = ({ classes, cardItem, apiAction }) => {
	return (
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
					color="primary"
					onClick={()=>deleteCard(cardItem, apiAction)}
				>
					Delete
				</Button>
			</CardActions>
		</Card>
	)
}

OutcomeCards.propTypes = {
	classes: PropTypes.object.isRequired,
	apiAction: PropTypes.func.isRequired,
};

export default compose(
	connect(null, { apiAction }),
	(withStyles(styles))
)(OutcomeCards);