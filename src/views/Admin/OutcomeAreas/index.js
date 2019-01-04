import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import  { Card, CardHeader, CardContent } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIndicator from './AddIndicator';
import EditIndicator from './EditIndicator';

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
			<div className={classes.root}>
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
					<Grid item xs={12}>
						<Grid container spacing={16}>
							<Grid item className={classes.grow} />
							<Grid item>
								<AddIndicator classes={classes} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
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