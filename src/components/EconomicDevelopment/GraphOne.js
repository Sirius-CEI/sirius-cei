import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import { Line } from 'react-chartjs-2';

const styles = theme => ({
  root: {
  },
});

let newData = [40,50,60,60,80,90];

const data = {
  labels: ['2014', '2015', '2016', '2017', '2018'],
  datasets: [{
      borderWidth: 0,
      data: newData,
      fill: false,
    }],
    animation: {
      duration: 1000,
      easing: 'linear'
    }
};

class GraphOne extends Component {
  render() {
    const { classes } = this.props;
      return (
        <Line
        data={data}
        options={{
          title: false,
          maintainAspectRatio: false
        }}
      />
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

GraphOne.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GraphOne));