import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import  { Card, CardHeader, CardContent } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import EditIndicator from './EditIndicator';
import AddIndicator from './AddIndicator';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
  buttonIcon: {
		marginLeft: theme.spacing.unit
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
	},
	test: {
		border: 'solid tomato 1px',
	},
});

class OutcomeAreas extends Component {
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
					<Grid item xs={12}>
						<EditIndicator />
					</Grid>
					{outcomes.map((item, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<Card>
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
				<AddIndicator classes={classes} />
				</Grid>
			</Fragment>
		);
  }
}

OutcomeAreas.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
	outcomes: reduxState.outcomes,
	indicator: reduxState.indicator
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(OutcomeAreas);