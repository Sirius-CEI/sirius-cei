import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';

import OutcomeList from './OutcomeList';
import AddCard from './Card.add';

const styles = theme => ({
	button: {
		display: 'flex',
		flexDirection: 'row',
		justify: 'flex-end'
	},
})

const Cards = ({ outcomes, classes }) => (
	<Fragment>
		<Grid
			container
			spacing={16}
			direction="row"
			justify="center"
			alignItems="stretch"
		>
		<Grid item xs={12}>
			<div className={classes.grow} />
			<AddCard />
		</Grid>
			{outcomes.length > 0 && outcomes.map((outcome, index) => (
				<Grid item xs={12} key={index}>
					<OutcomeList outcome={outcome} />
				</Grid>
			))}
		</Grid>
	</Fragment>
)

Cards.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ outcomes }) => ({ outcomes });

export default connect(mapStateToProps)(withStyles(styles)(Cards));