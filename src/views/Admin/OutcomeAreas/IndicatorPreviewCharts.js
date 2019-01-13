import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card, CardHeader, CardContent, CardActions, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import EditChart from './Chart.edit';
import AddChart from './Chart.add';

const styles = theme => ({
	grow: {
		flexGrow: 1,
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.gold.light,
	},
	actions: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
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
					alignItems="stretch"
					alignContent="flex-end"
				>
					{charts.length > 0 && charts.map((chart) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={chart._id}>
							<Card className={classes.card}>
								<CardHeader
									title={chart.type}
									titleTypographyProps={{
										variant: 'h5',
										align: 'center',
										color: 'primary'
									}}
								/>
								<Divider />
								<CardContent className={classes.content}>
									<Typography variant="body1" gutterBottom>
										{chart._id}
									</Typography>
									{chart.map_level && <Typography variant="body1" gutterBottom>
										{chart.map_level}
									</Typography>}
									{chart.citation && <Typography variant="body1" gutterBottom>
										{chart.citation}
									</Typography>}
								</CardContent>
								<Divider />
								<CardActions className={classes.actions}>
									<EditChart thisChart={chart} />
								</CardActions>
							</Card>
						</Grid>
					))}
					<Grid item className={classes.grow} />
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