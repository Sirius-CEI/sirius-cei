import React from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Indicator from  './IndicatorTest';
import OutcomeTitle from './OutcomeTitle';
import IndicatorList from './IndicatorList';

const styles = theme => ({
	root: {
		border: 'solid red 1px',
	},
	test: {
		border: 'solid red 1px'
	}
})

const OutcomePage = ({ classes, outcomeAreas, location }) => {
	const outcome = (outcomeAreas.find(outcome => (outcome.route === location.pathname)));

	return (
		<div>
			{outcome && <Grid container spacing={0}>

				<Grid item xs={12}>
					<OutcomeTitle title={outcome.title}/>
				</Grid>

				<Grid item xs={12}>
					<IndicatorList outcomeId={outcome._id} />
				</Grid>

			</Grid>}
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