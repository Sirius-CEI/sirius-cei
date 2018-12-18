import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  },
});

class HumanCapitol extends Component {
  render() {
    // const { classes } = this.props;
      return (
        <div>
          <p>HumanCapitol Test</p>
        </div>
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

HumanCapitol.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(HumanCapitol));