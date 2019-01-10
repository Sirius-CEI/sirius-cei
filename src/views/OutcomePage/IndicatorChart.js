import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Chart from 'react-google-charts';

import MapIndicator from './IndicatorChart.map';

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.grey[400],
		padding: theme.spacing.unit * 2,
	},
  button: {
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
	},
	test: {
		border: 'solid tomato 1px',
	}
});

const data = [
  ['year', 'one', 'two', 'three', 'four', 'five', 'six'],
  ['2013', 5, 6, 3, 2, 2, 5],
  ['2014', 3, 4, 3, 2, 4, 4],
  ['2015', 4, 4, 5, 2, 6, 4.5], 
  ['2016', 6, 7, 4, 2, 1, 2],
  ['2017', 3, 5, 6, 3, 8, 7]
];

class GraphIndicator extends Component {

  // state = {
  //   display: 'race',
  // };

  // handleDisplay = (event, display) => {
  //   console.log(display);
    
  //   this.setState({ display: display});
  //   console.log(this.state);
    
  // }

  render() {
    const { indicator, classes } = this.props;
      return (
        <div className={classes.root}>
						{
							this.state.display === 'location' ? (
								<MapIndicator/>
							) : (
								<Chart
									chartType="Line"
									data={data}
									graph_id={indicator.title}
									options={{
										colors: ['#4c2a74', '#008ab7', '#02c39a', '#ffc100', '#ff784f', '#d0021b'],
									}}
								/>
							)
						}
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