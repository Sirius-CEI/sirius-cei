import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Indicator from  './IndicatorTest';
import OutcomeTitle from './OutcomeTitle';
import IndicatorList from './IndicatorList';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	padding: {
		padding: theme.spacing.unit * 3
	},
	test: {
		border: 'solid red 1px'
	}
})

const OutcomePage = ({ classes, outcomeAreas, location }) => {
	const outcome = (outcomeAreas.find(outcome => (outcome.route === location.pathname)));

	return (
		<div className={classes.root}>
			{outcome &&
				<Fragment>
					<OutcomeTitle title={outcome.title} />
					<IndicatorList outcomeId={outcome._id} />
				</Fragment>
			}
		</div>
	);
}

OutcomePage.propTypes = {
	classes: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
	outcomeAreas: state.outcomes,
	indicatorList: state.indicatorList
});

export default connect(mapStateToProps)(withStyles(styles)(OutcomePage));