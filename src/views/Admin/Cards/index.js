import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';

import AddCard from './Card.add';
import CardList from './CardList';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justify: 'flex-end'
	},
	grow: {
		flexGrow: 1,
	}
})

const Cards = ({ outcomes, cards, classes }) => (
	<Fragment>
		<Grid
			container
			spacing={16}
			direction="row"
			justify="center"
			alignItems="stretch"
		>
			{cards.length > 0 && outcomes.map((outcome) => (
				<Grid item xs={12} key={outcome._id}>
					<CardList outcome={outcome} />
				</Grid>
			))}
			<Grid item xs={12} className={classes.button}>
				<div className={classes.grow} />
				<AddCard />
			</Grid>
		</Grid>
	</Fragment>
)

Cards.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ 
	outcomes: state.outcomes,
	cards: state.cards
});

export default connect(mapStateToProps)(withStyles(styles)(Cards));