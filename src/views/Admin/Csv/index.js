import React from 'react';
import ViewLatestCsv from './ViewLatestCsv';
import CsvConversion from './CsvConversion';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		padding: theme.spacing.unit
	}
});

const Csv = ({ classes }) => (
	<div className={classes.root}>
		<CsvConversion />
		<ViewLatestCsv />
	</div>
)

Csv.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Csv);