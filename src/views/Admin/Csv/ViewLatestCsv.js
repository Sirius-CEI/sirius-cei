import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardHeader, CardActions } from '@material-ui/core';

const styles = theme => ({
	root: {
		padding: theme.spacing.unit
	},
	recentCsv: {
		height: 180,
		width: 290,
	},
	actions: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});

class ViewLatestCsv extends Component {

	deleteCsv = (date) => {
		console.log('Delete CSV id: ', date);
		this.props.dispatch( { type: 'DELETE_CSV', payload: date } );
	}

	componentDidMount() {
		this.props.dispatch( { type: 'FETCH_CSV' } );
	}

	render() {
		const { classes, csv } = this.props;
		return (
			<div className={classes.root}>
				<Typography variant="h4" gutterBottom>Latest csv</Typography>
					{csv.map( (csv, index) => (
						<div key={index}>
							<Card className={classes.recentCsv} id="display">
								<CardHeader
									title="csv created at:"
									titleTypographyProps={{
										variant: "h5",
										color: "primary",
										align: "center"
									}}
								/>
								<CardContent>
									<Typography variant="h6" gutterBottom>{csv.createdAt}</Typography>
								</CardContent>
								<CardActions disableActionSpacing={true} className={classes.actions}>
									<Button
										variant="contained"
										color="primary"
										onClick={() => this.deleteCsv(csv.createdAt)}
									>
										Delete
									</Button>
								</CardActions>
							</Card>
						</div>
						)
					)}
			</div>
		);
	}
}

ViewLatestCsv.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
	csv: reduxState.csv
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(ViewLatestCsv);
