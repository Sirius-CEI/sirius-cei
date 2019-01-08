import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import 'typeface-lato';
import Grid from '@material-ui/core/Grid';
import 'react-chartjs-2';

import GraphIndicator from './GraphIndicator';
import TextIndicator from './TextIndicator';
import TitleIndicator from './TitleIndicator';

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

class IndicatorPage extends Component {
  render() {
    const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={12}>

            <Grid className={classes.title} item xs={12}>
              <TitleIndicator />
            </Grid>
          
            <Grid className={classes.graph} item md={6}>
              <GraphIndicator />
            </Grid>

            <Grid className={classes.text} item md={6}>
              <TextIndicator />
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

export default connect(mapStateToProps)(withStyles(styles)(IndicatorPage));