import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { Typography, CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';

const styles = theme => ({
		root: {
			maxWidth: '100%',
			height: 'auto',
		},
		title: {
			fontWeight: 700,
			color: 'white',
			textTransform: 'uppercase',
			margin: theme.spacing.unit * 2
		},
		card: {
			height: 180,
		},
		media: {
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
	});

class TitleIndicator extends Component {
	render() {
		const { classes, title } = this.props;
		return (
			<div className={classes.root}>
				<Card className={classes.card} elevation={0} square>
						<CardMedia
							className={classes.media}
							image="images/twincitiesblue.jpg"
						>
								<Typography variant="h3" align="center" className={classes.title}>{title}</Typography>
						</CardMedia>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = reduxState => ({
	reduxState,
});

TitleIndicator.propTypes = {
	classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(TitleIndicator));