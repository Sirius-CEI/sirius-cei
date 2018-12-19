import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  indicatorTitle: {
    fontSize: '30px',
    fontWeight: 500,
    color: '#4c2a74',
    textTransform: 'uppercase',
    letterSpacing: '1.53px',
    lineHeight: '1em',
    fontFamily: 'Lato',
    marginBottom: 20
  },
  indicatorText: {
    fontSize: '20px',
    display: 'block',
    margin: '3%',
    textAlign: 'justify'
  }
});

class TextField extends Component {
  render() {
    const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Typography className={classes.indicatorTitle}>Wages</Typography>
            <Typography className={classes.indicatorText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat scelerisque varius morbi enim nunc faucibus a. Tincidunt augue interdum velit euismod. Tellus at urna condimentum mattis pellentesque. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Enim ut tellus elementum sagittis vitae et leo duis. Libero justo laoreet sit amet cursus. Vitae nunc sed velit dignissim sodales ut eu sem. Ut consequat semper viverra nam libero justo laoreet sit amet.
            </Typography>
        </div>
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

TextField.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(TextField));