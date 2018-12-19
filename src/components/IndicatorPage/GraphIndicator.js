import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapIndicator from './MapIndicator';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Line } from 'react-chartjs-2';

const styles = theme => ({
  root: {
   margin: theme.spacing.unit,
  },
  button: {
    marginTop: '3%',
    marginBottom: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
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

  state = {
    display: 'race',
  };

  handleDisplay = (event, display) => {
    console.log(display);
    
    this.setState({ display: display});
    console.log(this.state);
    
  }

  render() {
    const { classes } = this.props;
      return (
        <div className={classes.root}>
          {
            this.state.display === 'location' ? (
              <MapIndicator/>
            ) : (
              <Line
              data={data}
                options={{
                title: false,
                maintainAspectRatio: false
              }}/>
            )
          }
          <div className={classes.button}>
            <ToggleButtonGroup exclusive value={this.state.display} onChange={this.handleDisplay}>
              <ToggleButton value="race">Race</ToggleButton>
              <ToggleButton value="location">Location</ToggleButton>
            </ToggleButtonGroup>
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