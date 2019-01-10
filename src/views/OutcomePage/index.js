import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Indicator from  './Indicator';
import OutcomeTitle from './OutcomeTitle';

const IndicatorPage = ({ classes, outcomeAreas, location }) => {
	const outcome = outcomeAreas.find(outcome => (outcome.route === location.pathname));
	return (
		<div>
			{outcome && <Grid container key={outcome._id}>

				<Grid item xs={12}>
					<OutcomeTitle title={outcome.title}/>
				</Grid>

				{outcome.indicators.map((indicator, index) => (
					<Grid item xs={12}>
						<Indicator
							key={index}
							order={index++}
							indicator={indicator}
						/>
					</Grid>
				))}
			</Grid>}
		</div>
	);
}

const mapStateToProps = state => ({
  outcomeAreas: state.outcomes,
});

export default connect(mapStateToProps)(IndicatorPage);