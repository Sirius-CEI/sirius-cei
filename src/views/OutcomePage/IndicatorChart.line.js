import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import Chart from 'react-google-charts';

const styles = theme => ({
	root: {
		height: '100%',
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
  ['year', 'White Non-Hispanic', 'White Hispanic or Latino', 'Black or African American', 'American Indian or Alaskan Native', 'Asian', 'Native Hawaiian or Pacific Islander', 'Two or More Races'],
  ['2013', 5, 6, 3, 2, 2, 5, 8],
  ['2014', 3, 4, 3, 2, 4, 4, 6],
  ['2015', 4, 4, 5, 2, 6, 4.5, 3], 
  ['2016', 6, 7, 4, 2, 1, 2, 2],
  ['2017', 3, 5, 6, 3, 8, 7, 9]
];

const LineChart = ({ indicator, classes }) => (
	<Chart
		chartType="Line"
		data={data}
		options={{
			colors: ['#4c2a74', '#008ab7', '#02c39a', '#ffc100', '#ff784f', '#d0021b', '#424242'],
			fontName: 'Lato',
			legend: {
				position: 'bottom',
				alignment: 'center',
			}
		}}
	/>
)

LineChart.propTypes = {
  classes: propTypes.object.isRequired,
};

export default withStyles(styles)(LineChart);