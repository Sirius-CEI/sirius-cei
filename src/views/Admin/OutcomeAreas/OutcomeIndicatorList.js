import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

const OutcomeIndicatorList = props => {
	const { classes, outcome, selectedIndicator, handleSelectIndicator } = props;
	return (
		<List className={classes.content}>
			{outcome.indicators.map((indicator) => (
				<ListItem
					button
					key={indicator._id}
					selected={selectedIndicator === indicator._id}
					onClick={()=>handleSelectIndicator(indicator, outcome._id)}
				>
					<ListItemText primary={indicator.title} />
				</ListItem>
			))}
		</List>
	)
}

export default OutcomeIndicatorList;