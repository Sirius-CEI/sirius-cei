import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper';

import EditIndicator from './Indicator.edit';
import IndicatorPreviewCharts from './IndicatorPreviewCharts';
import AddChart from './Chart.add';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	button: {
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		padding: 8,
	},
	grey: {
		backgroundColor: theme.palette.grey[300],
		borderRadius: theme.shape.borderRadius,
	},
	padded: {
		padding: 16,
	},
	test: {
		border: 'solid purple 1px',
		padding: 8,
		height: '100%'
	},
});

const PreviewIndicator = ({ classes, indicator, charts }) => (
	<Paper>
		<Grid
			container
			direction="row"
			justify="space-between"
			alignItems="center"
			wrap="nowrap"
			className={classes.padded}
		>
			<Grid item>
				<Typography variant="h4" color="secondary">{indicator.title}</Typography>
			</Grid>
			<Grid item>
				<EditIndicator />
			</Grid>
		</Grid>
		<Divider />
		<Grid container className={classes.padded}>
			<Grid item xs={12}>
				<Typography
					variant="body1"
					className={classnames(classes.grey, classes.padded)}
				>
					{indicator.copy}
				</Typography>
			</Grid>
		</Grid>
		<Divider />
		<Grid
			container
			direction="row"
			justify="flex-end"
			alignItems="stretch"
			className={classes.test}
		>
			<IndicatorPreviewCharts />
			<Grid item className={classnames(classes.grow, classes.button)}>
				<AddChart />
			</Grid>
		</Grid>
	</Paper>
)

PreviewIndicator.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
	indicator: reduxState.indicator,
	charts: reduxState.charts,
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(PreviewIndicator);