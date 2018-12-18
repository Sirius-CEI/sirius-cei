import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  },
});

class AccessTransit extends Component {
  render() {
    const { classes } = this.props;
      return (
        <div>
          <p>AccessTransit Test</p>
        </div>
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

AccessTransit.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(AccessTransit));