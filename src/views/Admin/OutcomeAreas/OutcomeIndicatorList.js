import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText } from '@material-ui/core';

const OutcomeIndicatorList = props => {
	const { outcomeId, indicatorList, indicator, dispatch } = props;
	const outcomeIndicators = indicatorList.filter(indicatorItem => indicatorItem.outcome_id === outcomeId);
	return (
		<List disablePadding>
			{outcomeIndicators.map((listItem) => (
				<ListItem
					button
					key={listItem._id}
					selected={indicator === listItem._id}
					onClick={()=>dispatch({ type: 'SET_INDICATOR', payload: listItem._id})}
				>
					<ListItemText primary={listItem.title} />
				</ListItem>
			))}
		</List>
	)
}

const mapStateToProps = ({ indicatorList, indicator }) => ({
	indicatorList: indicatorList,
	indicator: indicator
});

export default connect(mapStateToProps)(OutcomeIndicatorList);