import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
	grow: {
		flexGrow: 1,
	},
	grey: {
		backgroundColor: theme.palette.grey[300],
		minHeight: 180
	},
	gold: {
		backgroundColor: theme.palette.gold.light,
		minHeight: 180
	},
	title: {
		fontWeight: theme.typography.fontWeightMedium + 100,
		textTransform: 'uppercase'
	},
	test: {
		border: 'solid tomato 1px',
	}
})

const IndicatorPreviewCharts = ({ classes, charts }) => (
	<Fragment>
		{charts.map((chart) => (
			<Grid item xs={12} md={6} key={chart._id}>
				<Paper elevation={2}>
						<Grid container direction="row" alignItems="stretch">
							<Grid item xs={12} md={4} className={classnames(classes.grey)} />
							<Grid item component={ButtonBase} className={classnames(classes.gold, classes.grow)}>
								<Grid container direction="column">
								<Typography variant="h6" align="center" className={classes.title}>{chart.title}</Typography>
								<Typography>{chart.copy}</Typography>
								</Grid>
							</Grid>
						</Grid>
				</Paper>
			</Grid>
		))}
	</Fragment>
);

IndicatorPreviewCharts.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ charts: state.charts })

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(IndicatorPreviewCharts);