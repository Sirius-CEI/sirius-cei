import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  indicatorTitle: {
    fontSize: '30px',
    fontWeight: 500,
    color: '#4c2a74',
    textTransform: 'uppercase',
    letterSpacing: '1.53px',
    lineHeight: '1em',
    fontFamily: 'Lato',
    marginBottom: '1vh'
  },
  indicatorText: {
    fontSize: '15px',
    display: 'block',
    textAlign: 'justify',
  }
});

class TextField extends Component {
  render() {
    const { classes, indicator } = this.props;
      return (
        <div className={classes.root}>
          <Typography className={classes.indicatorTitle}>{indicator.title}</Typography>
            <Typography className={classes.indicatorText}>
              {indicator.copy}
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