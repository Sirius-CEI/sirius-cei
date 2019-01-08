import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Buttons from './Buttons';

import PreviewIndicator from './IndicatorPreview';
import OutcomeIndicatorCards from './OutcomeIndicatorCards';

const OutcomeAreas = ({ indicator }) => (
	<Grid container spacing={16}>
		{indicator._id && (
			<Grid item xs={12}>
				<PreviewIndicator />
			</Grid>
		)}
		<Grid item xs={12}>
			<OutcomeIndicatorCards />
		</Grid>
		<Grid item xs={12}>
			<Buttons />
		</Grid>
	</Grid>
)

const mapStateToProps = state => ({ indicator: state.indicator })

export default connect(mapStateToProps)(OutcomeAreas);
