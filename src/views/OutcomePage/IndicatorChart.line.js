import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import Chart from 'react-google-charts';
import { connect } from 'react-redux';

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
  ['year', 'White Non-Hispanic', 'White Hispanic or Latino', 'Black or African American', 'American Indian or Alaskan Native', 'Asian', 'Native Hawaiian or Pacific Islander', 'Two or More Races'],
  ['2013', 5, 6, 3, 2, 2, 5, 8],
  ['2014', 3, 4, 3, 2, 4, 4, 6],
  ['2015', 4, 4, 5, 2, 6, 4.5, 3], 
  ['2016', 6, 7, 4, 2, 1, 2, 2],
  ['2017', 3, 5, 6, 3, 8, 7, 9]
];

class LineChart extends Component {

	render() {

		const { indicator, classes, chart, chartData } = this.props;

		this.getData = (chartData, chart) => {
			let data = chartData.filter(item => (item.chart === chart._id));
			if (data === []) {
				return null;
			}
			let maxYear = Math.max.apply(Math, data.map(item => item.year ));
			let minYear = maxYear-5;
			data = data.sort((a,b) => (a.variable > b.variable) ? 1: ((b.variable > a.variable) ? -1 : 0));
			let graphData = [];
			for (let y = minYear; y < maxYear; y++) {
				let yearData = data.filter(item => (item.year === y));
				console.log(yearData);
				
				//on first loop only, create key row of array
				if (y === minYear) {
					let firstRow = ['year'];
					for (let i=0; i< yearData.length; i++) {
						let x = yearData[i];
						
						firstRow.push(x.variable);
					}
					graphData.push(firstRow);
				}
				let yearRow = [y.toString()]
				for (let i=0; i< yearData.length; i++) {
					let x = yearData[i];
					yearRow.push(x.value);
				}
				graphData.push(yearRow);
			}
			console.log(graphData);

			return graphData;
		}

		return (
			<Chart
				chartType="Line"
				data={this.getData(chartData, chart)}
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
	}

}

LineChart.propTypes = {
	classes: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
	chartData: state.chartData,
});

export default connect(mapStateToProps)(withStyles(styles)(LineChart));