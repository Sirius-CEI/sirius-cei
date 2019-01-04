import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import  { Card, CardHeader, CardContent } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';

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
	test: {
		border: 'solid tomato 1px',
	},
});

class OutcomeIndicatorCards extends Component {
	state = {
		selectedIndicator: ''
	}

	handleSelectIndicator = indicator => {
		this.setState({
			selectedIndicator: indicator._id,
		});
		this.props.dispatch({
			type: 'SET_INDICATOR',
			payload: indicator
		})
	}

  render() {
		const { classes, outcomes } = this.props;
		const { selectedIndicator } = this.state;
		return (
			<Fragment>
				<Grid container spacing={16} direction="row" justify="center" alignItems="stretch">
					{outcomes.map((item, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<Card className={classes.card}>
								<CardHeader
									title={item.title}
									titleTypographyProps={{
										variant: 'h6',
										color: 'primary'
									}}
								/>
								<CardContent>
									<List>
										{item.indicators.map((indicator) => (
											<ListItem
												button
												key={indicator._id}
												selected={selectedIndicator === indicator._id}
												onClick={()=>this.handleSelectIndicator(indicator)}
											>
												<ListItemText primary={indicator.title} />
											</ListItem>
										))}
									</List>
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