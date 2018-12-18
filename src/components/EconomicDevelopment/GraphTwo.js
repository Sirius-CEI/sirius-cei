import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import { Line } from 'react-chartjs-2';

const styles = theme => ({
  root: {
  },
});

let newData = [30,50,50,60,70,70];

const data = {
  labels: ['2014', '2015', '2016', '2017', '2018'],
  datasets: [{
      label: 'Employment',
      borderWidth: 0,
      data: newData,
      fill: false,
    }],
    animation: {
      duration: 1000,
      easing: 'linear'
    }
};

class GraphTwo extends Component {
  render() {
    const { classes } = this.props;
      return (
        <Line
        data={data}
        options={{
        maintainAspectRatio: false
        }}
      />
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

GraphTwo.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GraphTwo));