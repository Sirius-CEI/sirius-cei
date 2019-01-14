import React, { Component } from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IndicatorChart from './IndicatorChart';
import IndicatorText from './IndicatorText';

const styles = theme => ({
  root: {
		flexGrow: 1,
		padding: theme.spacing.unit * 2,
	},
	grow: {
		flexGrow: 1,
		border: 'solid tomato 1px',
		height: '100%'
	},
	grey: {
		backgroundColor: theme.palette.grey[400],
	},
	gold: {
		backgroundColor: theme.palette.gold.light,
	},
	padded: {
		padding: theme.spacing.unit * 2,
	},
	test: {
		border: 'solid tomato 1px'
	},
});

const IndicatorItem = ({ classes, indicator, order }) => (
	<div className={classes.root}>
		<Grid
			container
			spacing={0}
			direction={order%2 === 0 ? 'row' : 'row-reverse'}
			alignItems="stretch"
		>
			<Grid item xs={12} sm={12} md className={classnames(classes.grey, classes.padded)}>
				<IndicatorChart indicator={indicator} />
			</Grid>
			<Grid item xs={12} sm={12} md className={classnames(classes.gold, classes.padded)}>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="stretch"
				>
					<Grid item>
						<Typography
							variant="h4"
							align="center"
							paragraph
						>
							{indicator.title}
						</Typography>
					</Grid>
					<Grid item>
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
							{indicator.what_this_means_copy}
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
							{indicator.why_this_matters_copy}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={false} sm={false} md={1} />
		</Grid>
	</div>
)

IndicatorItem.propTypes = {
	classes: propTypes.object.isRequired,
};

export default withStyles(styles)(IndicatorItem);