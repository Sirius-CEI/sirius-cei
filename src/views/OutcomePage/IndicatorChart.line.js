import React from 'react';
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
	test: {
		border: 'solid tomato 1px',
	}
});

const data = [
	[
		'year',
		'White Alone',
		'Black or African American Alone',
		'American Indian or Alaska Native Alone',
		'Asian Alone',
		'Native Hawaiian or Other Pacific Islander Alone',
		'Two or More Race Groups'
	],
	[2012, 4905, 2726, 2950, 4186, 2713, 3150],
	[2013, 4980, 2738, 3002, 4260, 2829, 3210],
	[2014, 5138, 2788, 3055, 4333, 2960, 3312],
	[2015, 5342, 2926, 3151, 4559, 3081, 3458],
	[2016, 5408, 2979, 3193, 4592, 3188, 3539]
]

const LineChart = ({ indicator, classes }) => (
	<Chart
		chartType="LineChart"
		data={data}
		options={{
			colors: ['#4c2a74', '#008ab7', '#02c39a', '#ffc100', '#ff784f', '#d0021b', '#424242'],
			fontName: 'Lato',
			legend: {
				position: 'bottom',
			},
			height: '300px',
			width: '100%'
		}}
	/>
)

LineChart.propTypes = {
  classes: propTypes.object.isRequired,
};

export default withStyles(styles)(LineChart);