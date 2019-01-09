import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import EditChart from './Chart.edit';
import AddChart from './Chart.add';

const styles = theme => ({
	grow: {
		flexGrow: 1,
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
					justify="space-between"
					alignItems="flex-end"
					alignContent="flex-end"
				>
					{charts.map((chart) => (
						<Grid item xs={12} md={6} key={chart._id}>
							<Card>
								<Grid container direction="row" alignItems="stretch" alignContent="stretch">
									<Grid item xs={12} sm={4} className={classes.grey} />
									<Grid item xs={12} sm={8} className={classes.gold}>
										<EditChart thisChart={chart} />
									</Grid>
								</Grid>
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