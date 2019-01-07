import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import  { Card, CardHeader, CardContent } from '@material-ui/core';

import OutcomeIndicatorList from './OutcomeIndicatorList';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	card: {
		height: '100%',
	},
	content: {
		paddingTop: 0,
		paddingBottom: 0,
	},
	test: {
		border: 'solid tomato 1px',
	},
});

class OutcomeIndicatorCards extends Component {
	state = {
		selectedIndicator: ''
	}

	handleSelectIndicator = (indicator, outcomeId) => {
		this.setState({
			selectedIndicator: indicator._id,
		});
		this.props.dispatch({
			type: 'SET_INDICATOR',
			payload: { outcomeId: outcomeId, ...indicator }
		})
		this.props.dispatch({
			type: 'GET_CHARTS',
			indicator: indicator._id
		})
	}

  render() {
		const { classes, outcomes } = this.props;
		const { selectedIndicator } = this.state;
		return (
			<Fragment>
				<Grid container spacing={16} direction="row" justify="center" alignItems="stretch">
					{outcomes.map((item) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
							<Card className={classes.card}>
								<CardHeader
									title={item.title}
									titleTypographyProps={{
										variant: 'h6',
										color: 'primary'
									}}
								/>
								<Divider />
								<CardContent className={classes.content}>
									<OutcomeIndicatorList
										classes={classes}
										outcome={item}
										selectedIndicator={selectedIndicator}
										handleSelectIndicator={this.handleSelectIndicator}
									/>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Fragment>
		);
  }
}

OutcomeIndicatorCards.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
	outcomes: reduxState.outcomes,
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(OutcomeIndicatorCards);