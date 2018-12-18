import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

class GraphIndicator extends Component {
  render() {
      return (
        <div>
          <Line
            data={data}
              options={{
              title: false,
              maintainAspectRatio: false
        }}/>
        <Button>Race</Button>
        </div>
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

GraphIndicator.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GraphIndicator));