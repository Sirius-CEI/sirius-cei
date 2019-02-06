import React from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Indicator from  './Indicator';

const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 2,
		flexGrow: 1,
		backgroundColor: '#FFFFFF',
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
			{indicators && indicators.map((indicator, index) => (
					<Indicator
						key={indicator._id}
						order={index++}
						indicator={indicator}
					/>
			))}
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