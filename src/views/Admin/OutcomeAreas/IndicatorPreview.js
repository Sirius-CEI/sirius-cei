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
		flexGrow: 1
	},
});

const PreviewIndicator = ({ classes, indicatorObj }) => (
	<Paper>
		<div className={classes.padded}>
			<Grid
				container
				spacing={8}
				direction="row"
				justify="center"
				alignItems="center"
				wrap="nowrap"
			>
				<Grid item className={classes.grow}>
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
							variant="h6"
							align="left"
							gutterBottom
						>
							WHAT THIS MEASURES:
						</Typography>
						<Typography
							variant="body1"
							align="justify"
							paragraph
						>
							{indicatorObj.what_this_means_copy}
						</Typography>
						<Typography
							variant="h6"
							align="left"
							gutterBottom
						>
							WHY THIS MATTERS:
						</Typography>
						<Typography
							variant="body1"
							align="justify"
							paragraph
						>
							{indicatorObj.why_this_matters_copy}
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