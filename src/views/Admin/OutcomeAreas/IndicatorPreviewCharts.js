import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import EditChart from './Chart.edit';
import AddChart from './Chart.add';

const styles = theme => ({
	grow: {
		flexGrow: 1,
	},
	card: {
		height: '100%'
	},
	chart: {
		backgroundColor: theme.palette.gold.light,
		minHeight: 180
	},
	grey: {
		flexGrow: 1,
		backgroundColor: theme.palette.grey[300],
		minHeight: 180
	},
	gold: {
		flexGrow: 1,
		backgroundColor: theme.palette.gold.light,
		minHeight: 180
	},
	padded: {
		padding: 16,
	},
	test: {
		border: 'solid tomato 1px',
	}
})

class IndicatorPreviewCharts extends Component {
	render() {
		const { classes, charts } = this.props;
		return (
			<Fragment>
				<Grid
					container
					spacing={16}
					direction="row"
					alignItems="stretch"
					alignContents="flex-end"
				>
					{charts.map((chart) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={chart._id}>
							<Card className={classes.card}>
								<CardHeader
									title={chart.type}
									titleTypographyProps={{
										variant: 'h4',
										color: 'secondary'
									}}
								/>
								<CardContent className={classes.grow}>
										{chart.map_level && <Typography variant="body1"> {chart.map_level}</Typography>}
										{chart.citation && <Typography variant="body1"> {chart.citation}</Typography>}
										{chart._id && <Typography variant="body1"> {chart._id}</Typography>}
								</CardContent>
								<CardActions>
										<EditChart thisChart={chart} />
								</CardActions>
							</Card>
						</Grid>
					))}
					{charts.length === 0 ? <Grid item className={classes.grow} /> : null}
					<Grid item >
						<AddChart />
					</Grid>
				</Grid>
			</Fragment>
		)
	}
}

IndicatorPreviewCharts.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ charts, indicator }) => ({ 
	charts: charts.filter(chart => chart.indicator_id === indicator)
})

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(IndicatorPreviewCharts);