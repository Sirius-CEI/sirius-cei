import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardHeader, CardActions, Grid, Divider } from '@material-ui/core';

const styles = theme => ({
	root: {
		padding: theme.spacing.unit
	},
	recentCsv: {
		minHeight: 180,
	},
	actions: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});

class ViewLatestCsv extends Component {
	deleteCsv = (uuid) => {
		this.props.dispatch( { type: 'DELETE_CSV', payload: uuid } );
	}

	componentDidMount() {
		this.props.dispatch( { type: 'FETCH_CSV' } );
	}

	render() {
		const { classes, csv } = this.props;
		return (
			<div className={classes.root}>
				<Typography variant="h4" gutterBottom>Loaded csv files</Typography>
				<Grid container spacing={16}>
					{csv.map( (item, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<Card className={classes.recentCsv} id="display">
								<CardHeader
									title={item.fileInfo.filename}
									titleTypographyProps={{
										variant: "h5",
										color: "primary",
										align: "center"
									}}
								/>
								<Divider />
								<CardContent>
									<Typography variant="h6" gutterBottom>upload date: {item.fileInfo.uploadTs}</Typography>
								</CardContent>
								<Divider />
								<CardActions className={classes.actions}>
									<Button
										variant="contained"
										color="primary"
										onClick={() => this.deleteCsv(csv._id)}
									>
										Delete
									</Button>
								</CardActions>
							</Card>
						</Grid>
						)
					)}
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
