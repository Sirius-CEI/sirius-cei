import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

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
		padding: theme.spacing.unit * 2,
	},
	test: {
		border: 'solid purple 1px',
		flexGrow: 1
	},
});

const PreviewIndicator = ({ classes, indicatorObj, dispatch }) => (
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
				<Grid item>
					<IconButton onClick={()=>dispatch({type: 'SET_INDICATOR', payload: ''})}>
						<FontAwesomeIcon icon="times" size="xs" />
					</IconButton>
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