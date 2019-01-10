import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import 'typeface-lato';
import Grid from '@material-ui/core/Grid';
import 'react-chartjs-2';

import GraphIndicator from './GraphIndicator';
import TextIndicator from './TextIndicator';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    width: '100%'
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
    const { classes, indicator } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={16}>
          
            <Grid className={classes.graph} item md={6}>
              <GraphIndicator 
                indicator={indicator}
              />
            </Grid>

            <Grid className={classes.text} item md={6}>
              <TextIndicator 
                indicator={indicator}
              />
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
};

export default connect(mapStateToProps)(withStyles(styles)(Indicator));