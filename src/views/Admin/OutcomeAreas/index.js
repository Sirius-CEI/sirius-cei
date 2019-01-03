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
import IconButton from '@material-ui/core/IconButton';
import AddIndicator from './AddIndicator';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
  heading: {
		color: theme.palette.text.primary,
		flexGrow: 1,
  },
  button: {
		marginLeft: theme.spacing.unit
	},
	test: {
		border: 'solid tomato 1px',
		alignContent: 'center'
	}
});

class OutcomeAreas extends Component {

	state = {
		expanded: ''
	}	

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
	};

  render() {
		const { classes, outcomes } = this.props;
		const { expanded } = this.state;
		return (
			<div className={classes.root}>
				<Grid container spacing={16}>
				{outcomes.map((item, index) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
						<Card>
							<CardContent>
								<Grid container direction="row" justify="center" alignItems="center">
									<Grid item className={classes.grow}>
										<Typography variant="body1" className={classes.heading}>
											{item.title}
										</Typography>
									</Grid>
									<Grid item>
										<AddIndicator item={item} />
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				))}
				</Grid>
			</div>
		);
  }
}

OutcomeAreas.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  outcomes: reduxState.outcomes
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(OutcomeAreas);