import React, { Component } from 'react';

import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.gold.light,
		padding: theme.spacing.unit * 2,
		flexGrow: 1
	},
	toggle: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	grow: {
		flexGrow: 1
	},
	test: {
		border: 'solid purple 1px'
	}
});

const lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const IndicatorText = ({ classes, indicator, handleDisplay, display }) => (
	<div className={classes.root}>
		<Grid
			container
			spacing={0}
			direction="column"
		>
			<Grid item>
				<Typography variant="h4" align="center">{indicator.title}</Typography>
			</Grid>
			<Grid item className={classes.grow}>
				<Typography variant="body1" align="justify">{lipsum}</Typography>
			</Grid>
			<Grid item>
				<Grid container>
					<Grid item>
						<ToggleButtonGroup exclusive value={display} onChange={handleDisplay}>
							<ToggleButton value="race">Race/Ethnicity</ToggleButton>
							<ToggleButton value="location">Location</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</div>
)

IndicatorText.propTypes = {
  classes: propTypes.object.isRequired,
};

export default withStyles(styles)(IndicatorText);