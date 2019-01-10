import React from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Indicator from  './IndicatorTest';

const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 3,
	},
	test: {
		border: 'solid red 1px'
	}
})

const IndicatorList = ({ classes, outcomeId, indicatorList }) => {
	const indicators = (
		indicatorList.filter(indicator => (indicator.outcome_id === outcomeId))
	)

	return (
		<div className={classes.root}>
			<Grid container spacing={24}>
				{indicators.map((indicator, index) => (
					<Grid item key={indicator._id}>
						<Indicator
							order={index++}
							indicator={indicator}
						/>
					</Grid>
				))}
				</Grid>
		</div>
	);
}

IndicatorList.propTypes = {
	classes: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
	outcomeAreas: state.outcomes,
	indicatorList: state.indicatorList
});

export default connect(mapStateToProps)(withStyles(styles)(IndicatorList));