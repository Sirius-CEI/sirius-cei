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

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	grey: {
		backgroundColor: theme.palette.grey[300],
		borderRadius: theme.shape.borderRadius,
	},
	gold: {
		backgroundColor: theme.palette.gold.light,
		borderRadius: theme.shape.borderRadius,
	},
	padded: {
		padding: 16,
	},
	test: {
		border: 'solid purple 1px',
	},
});

const PreviewIndicator = ({ classes, indicatorObj }) => (
	<Paper>
		<div className={classes.padded}>
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				wrap="nowrap"
			>
				<Grid item>
					<Typography variant="h4" color="secondary">{indicatorObj.title}</Typography>
				</Grid>
				<Grid item>
					<EditIndicator />
				</Grid>
			</Grid>
		</div>
		<Divider />
		<div className={classes.padded}>
			<Grid container>
				<Grid item xs={12}>
					<Typography
						variant="body1"
						className={classnames(classes.grey, classes.padded)}
					>
						{indicatorObj.copy}
					</Typography>
				</Grid>
			</Grid>
		</div>
		<Divider />
		<div className={classes.padded}>
			<IndicatorPreviewCharts />
		</div>
	</Paper>
)

PreviewIndicator.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	const filtered = state.indicatorList.filter(indicatorItem => indicatorItem._id === state.indicator)
	return { indicatorObj: filtered[0] }
}

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(PreviewIndicator);