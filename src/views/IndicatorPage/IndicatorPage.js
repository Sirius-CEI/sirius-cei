import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import 'react-chartjs-2';

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
		const { classes, outcomeAreas, location } = this.props;
		const outcome = outcomeAreas.find(outcome => {return outcome.route === location.pathname});
		console.log(outcome);
		return (
			<div className={classes.root}>
				{outcome && <Grid container spacing={0}>

					<Grid className={classes.title} item xs={12}>
            <TitleIndicator title={outcome.title}/>
          </Grid>

					{outcome.indicators.map((indicator, index) => (
						<Indicator
							key={index}
							indicator={indicator}/>
					))}
					<Grid item>
					</Grid>
				</Grid>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
  outcomeAreas: state.outcomes,
});

IndicatorPage.propTypes = {
  classes: propTypes.object.isRequired,
};

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(IndicatorPage);