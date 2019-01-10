import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import IndicatorChart from './IndicatorChart';
import IndicatorText from './IndicatorText';

const styles = theme => ({
  root: {
		flexGrow: 1,
		padding: 16,
		border: 'solid tomato 1px',
  },
  title: {
    marginBottom: '5vh'
  },
  graph: {
    padding: '1%'
  },
  text: {
    padding: '1%'
  },
});

class Indicator extends Component {
  render() {
    const { classes, indicator, order } = this.props;
      return (
        <div className={classes.root}>
          <Grid
						container
						spacing={16}
						direction={order%2 === 0 ? 'row' : 'row-reverse'}
					>
            <Grid item xs={12} md={6}>
              <IndicatorChart indicator={indicator} />
            </Grid>

            <Grid className={classes.text} item xs={12} md={6}>
              <IndicatorText indicator={indicator} />
            </Grid>
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
	key: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Indicator));