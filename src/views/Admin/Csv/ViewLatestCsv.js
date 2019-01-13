import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardHeader, CardActions, Grid } from '@material-ui/core';

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing.unit
	},
	grow: {
		flexGrow: 1
	},
	recentCsv: {
		minHeight: 180,
		minWidth: 290,
	},
	actions: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});

class ViewLatestCsv extends Component {

	deleteCsv = (date) => {
		console.log('Delete CSV id:', date);
		this.props.dispatch( { type: 'DELETE_CSV', payload: date } );
	}

	componentWillMount() {
		this.props.dispatch({
			type: 'GET_DATA',
			main: 'FETCH_CSV'
		})
	}

	render() {
		const { classes, csv } = this.props;
		const dateList = csv.map((item, index) => (item.createdAt))
		const uniqueDates = dateList.filter((x, i, a) => a.indexOf(x) == i)
		return (
			<div className={classes.root}>
				<Typography variant="h4" gutterBottom>CSV Uploads</Typography>
				<Grid
					container
					spacing={16}
					direction="row"
					justify="center"
					alignItems="stretch"
				>
					{uniqueDates.length > 1 && uniqueDates.map( (date, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
									<Typography variant="h6" gutterBottom>{date}</Typography>
								</CardContent>
								<CardActions disableActionSpacing={true} className={classes.actions}>
									<Button
										variant="contained"
										color="primary"
										onClick={() => this.deleteCsv(date)}
									>
										Delete
									</Button>
								</CardActions>
							</Card>
						</Grid>
						)
					)}
					<Grid item className={classes.grow} />
					</Grid>
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
