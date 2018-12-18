import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import 'typeface-lato';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: '45px',
    fontWeight: 500,
    color: '#4c2a74',
    textTransform: 'uppercase',
    letterSpacing: '1.53px',
    lineHeight: '1em',
    fontFamily: 'Lato',
    marginBottom: '80px',
  },
  indicatorTitle: {
    fontSize: '30px',
    fontWeight: 500,
    color: '#4c2a74',
    textTransform: 'uppercase',
    letterSpacing: '1.53px',
    lineHeight: '1em',
    fontFamily: 'Lato',
  },
  indicatorText: {
    fontSize: '20px',
    textAlign: 'center',
    display: 'block',
  }
});

class EconomicDevelopment extends Component {
  render() {
    const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography className={classes.title}>Economic Development</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography className={classes.wageGraph}>Annual Wages Graph</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.indicatorTitle}>Annual Wages Title</Typography>
              <Typography className={classes.indicatorText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography className={classes.indicatorTitle}>Employment Title</Typography>
              <Typography className={classes.indicatorText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.employmentGraph}>Employment Graph</Typography>
            </Grid>
          </Grid>
        </div>
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

EconomicDevelopment.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(EconomicDevelopment));