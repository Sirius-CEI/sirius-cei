import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import IndicatorChart from '../../src/views/OutcomePage/IndicatorChart';
import IndicatorText from '../../src/views/OutcomePage/IndicatorText';

const styles = theme => ({
  root: {
		padding: theme.spacing.unit
	},
});

class Indicator extends Component {
	state = {
    display: 'race',
  };

  handleDisplay = (event, display) => {
    console.log(display);
    
    this.setState({ display: display});
    console.log(this.state);
    
	}
	
  render() {
		const { classes, indicator, order } = this.props;
		const { display } = this.state;
		return (
			<div className={classes.root}>
				<Grid
					container
					spacing={0}
					alignItems="stretch"
					direction={order%2 === 0 ? 'row' : 'row-reverse'}
				>
					<Grid item xs={12} md={5}>
						<IndicatorChart indicator={indicator} />
					</Grid>

					<Grid className={classes.text} item xs={12} md={6}>
						<IndicatorText indicator={indicator} handleDisplay={this.handleDisplay} display={display}/>
					</Grid>

					<Grid item xs={false} md={1} />
				</Grid>
			</div>
		);
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

Indicator.propTypes = {
	classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Indicator));