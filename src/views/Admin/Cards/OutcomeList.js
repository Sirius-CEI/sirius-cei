import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Grid
} from '@material-ui/core';

import OutcomeCards from './OutcomeCards';
import AddCard from './Card.add';

const styles = theme => ({
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
	action: {
		alignSelf: 'center',
	}
});

const OutcomeList = ({ classes, cards, outcome }) => {
	const outcomeCards = cards.filter(item => item.outcome_id === outcome._id);

	return (
		<Card>
			<CardHeader
				title={outcome.title}
				action={<AddCard outcomeId={outcome._id} />}
				classes={{
					action: classes.action
				}}
			/>
			<Divider />
			<CardContent className={classes.list}>
				<Grid container spacing={0} className={classes.spacing}>
					{outcomeCards.map((cardItem, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} className={classes.spacing} key={index}>
							<OutcomeCards cardItem={cardItem} />
						</Grid>
					))}
					<Grid item className={classes.grow} />
				</Grid>
			</CardContent>
		</Card>
	)
}

OutcomeList.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ cards }) => ({
	cards: cards
})

export default compose(
	connect(mapStateToProps),
	(withStyles(styles))
)(OutcomeList);