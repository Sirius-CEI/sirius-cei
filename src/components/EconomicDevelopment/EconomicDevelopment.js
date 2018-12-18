import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import 'typeface-lato';
import Grid from '@material-ui/core/Grid';
import { Typography, CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';

import GraphIndicator from './GraphIndicator';
import TextIndicator from './TextIndicator';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    padding: 'auto',
    fontSize: '45px',
    fontWeight: 700,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '1.53px',
    lineHeight: '1em',
    fontFamily: 'Lato',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  card: {
    height: 500,
    position: 'relative',
    marginBottom: 30,
  },
  media: {
    height: '100%',
    overflow: 'hidden'
  },
});

class EconomicDevelopment extends Component {
  render() {
    const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>

            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="images/twincitiesblue.jpg"
                  title="title-background">
                  <Typography className={classes.title}>Economic Development</Typography>
                </CardMedia>
              </Card>
            </Grid>
          
            <Grid item xs={6}>
              <GraphIndicator />
            </Grid>
            <Grid item xs={6}>
              <TextIndicator />
            </Grid>

            <Grid item xs={6}>
              <TextIndicator />
            </Grid>
            <Grid item xs={6}>
              <GraphIndicator />
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