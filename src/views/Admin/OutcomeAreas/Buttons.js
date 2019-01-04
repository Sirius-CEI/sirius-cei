import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddOutcomeArea from './AddOutcomeArea';
import AddIndicator from './AddIndicator';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	test: {
		border: 'solid tomato 1px'
	}
});

const Buttons = ({ classes }) => (
	<Grid container spacing={16} direction="row" justify="flex-end" className={classes.root}>
		<Grid item>
			<AddOutcomeArea />
		</Grid>
		<Grid item>
			<AddIndicator />
		</Grid>
	</Grid>
)

Buttons.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Buttons);
