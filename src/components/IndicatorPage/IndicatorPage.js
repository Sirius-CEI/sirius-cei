import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'react-chartjs-2';

import Nav from '../UI/Nav';
import FooterNav from '../UI/FooterNav';
import Footer from '../UI/Footer';
import GraphIndicator from './GraphIndicator';
import TextIndicator from './TextIndicator';
import TitleIndicator from './TitleIndicator';

const styles = theme => ({
  root: {
    flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
});

class IndicatorPage extends Component {
  render() {
		const { classes } = this.props;
		console.log(this.props);
		return (
			<div className={classes.root}>
				<Grid container spacing={0}>
					<Grid item>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = reduxState => ({
  reduxState,
});

IndicatorPage.propTypes = {
  classes: propTypes.object.isRequired,
};

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(IndicatorPage);