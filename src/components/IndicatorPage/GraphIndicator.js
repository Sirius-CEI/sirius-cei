import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Line } from 'react-chartjs-2';

const styles = theme => ({
  button: {
    margin: '3%'
  },
  race: {
    marginRight: theme.spacing.unit,
    borderRadius: 20,
  },
  location: {
    marginLeft: theme.spacing.unit,
    borderRadius: 20
  } 
});

let newData = [40,50,60,60,80,90];

const data = {
  labels: ['2014', '2015', '2016', '2017', '2018'],
  datasets: [{
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
    const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Line
            data={data}
              options={{
              title: false,
              maintainAspectRatio: false
        }}/>
          <div className={classes.button}>
            <Button variant="outlined" size="large" color="primary" className={classes.race}>Race</Button>
            <Button variant="outlined" size="large" color="primary" className={classes.location}>Location</Button>
          </div>
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