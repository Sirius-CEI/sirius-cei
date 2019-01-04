import React from 'react';
import EditIndicator from './EditIndicator';
import OutcomeIndicatorCards from './OutcomeIndicatorCards';
import Grid from '@material-ui/core/Grid';
import Buttons from './Buttons';

const OutcomeAreas = props => (
	<Grid container spacing={16}>
		<Grid item xs={12}>
			<Buttons />
		</Grid>
		<Grid item xs={12}>
			<EditIndicator />
		</Grid>
		<Grid item xs={12}>
			<OutcomeIndicatorCards />
		</Grid>
	</Grid>
)

export default OutcomeAreas;
