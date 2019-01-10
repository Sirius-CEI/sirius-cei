import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import  { Card, CardContent } from '@material-ui/core';

import OutcomeIndicatorList from './OutcomeIndicatorList';
import EditOutcome from './OutcomeArea.edit';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	card: {
		height: '100%',
	},
	content: {
		paddingTop: 0,
		paddingBottom: 0,
	},
	test: {
		border: 'solid tomato 1px',
	},
});

const OutcomeIndicatorCards = ({ classes, outcomes }) => (
	<Fragment>
		<Grid container spacing={16} direction="row" justify="center" alignItems="stretch">
			{outcomes.map((outcome) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={outcome._id}>
					<Card className={classes.card}>
						<EditOutcome item={outcome}/>
						<Divider />
						<CardContent className={classes.content}>
							<OutcomeIndicatorList outcomeId={outcome._id} />
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	</Fragment>
)

OutcomeIndicatorCards.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
	outcomes: reduxState.outcomes,
	indicator: reduxState.indicator,
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(OutcomeIndicatorCards);