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
		display: 'flex',
		flexDirection: direction,
		alignItems: 'stretch'
	},
	grey: {
		backgroundColor: theme.palette.grey[400],
	},
	gold: {
		backgroundColor: theme.palette.gold.light,
	},
	padded: {
		padding: theme.spacing.unit * 2,
		height: '100%',
	},
	test: {
		border: 'solid tomato 1px'
	},
});

const direction = props => (props.index%2 === 0 ? 'row' : 'row-reverse')

const IndicatorItem = ({ classes, indicator, order }) => (
	<div className={classes.root}>
		<Grid
			container
			spacing={0}
			direction={order%2 === 0 ? 'row' : 'row-reverse'}
			justify="space-between"
			alignItems="stretch"
		>
			<Grid item xs={12} md className={classnames(classes.grey, classes.padded)}>
				<IndicatorChart indicator={indicator} />
			</Grid>
			<Grid item xs={12} md className={classnames(classes.gold, classes.padded)}>
				<Grid
					container
					spacing={16}
					direction="column"
				>
					<Grid item>
						<Typography
							variant="h4"
							align="center"
						>
							{indicator.title}
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant="body1"
							align="justify"
						>
							{indicator.copy}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={false} md={1} />
		</Grid>
	</div>
)

IndicatorItem.propTypes = {
	classes: propTypes.object.isRequired,
};

export default withStyles(styles)(IndicatorItem);