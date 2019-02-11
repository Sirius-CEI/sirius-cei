import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import OutcomeTitle from './OutcomeTitle';
import IndicatorList from './IndicatorList';
import LearnMore from './LearnMore';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
})

const OutcomePage = ({ classes, outcomeAreas, location }) => {
	const outcome = (outcomeAreas.find(outcome => (outcome.route === location.pathname)));


	return (
		<div className={classes.root}>
			{outcome &&
				<Fragment>
					<OutcomeTitle title={outcome.title} />
					<IndicatorList outcomeId={outcome._id} />
					<LearnMore outcomeId={outcome._id} />
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