import React, { Component, Fragment } from 'react';
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
	chart: {
		
	}
});

class LineChart extends Component {

	getData = (chartData, chart) => {
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

		return graphData;
	}

	render() {

		const { classes, chart, chartData } = this.props;

		return (
			<Fragment>
			<Chart
				className={classes.chart}
				chartType="Line"
				data={this.getData(chartData, chart)}
				options={{
					colors: ['#4c2a74', '#008ab7', '#02c39a', '#ffc100', '#ff784f', '#d0021b', '#424242'],
					fontName: 'Lato',
					height: 250,
					width: '100%',
					legend: {
						position: 'none'
					},
					animation: {
						startup: true,
						duration: 1000,
					},
				}}
			/>
			<Chart
				chartType="LineChart"
				data={this.getData(chartData, chart)}
				options={{
					colors: ['#4c2a74', '#008ab7', '#02c39a', '#ffc100', '#ff784f', '#d0021b', '#424242'],
					fontName: 'Lato',
					height: 60,
					width: '100%',
					chartArea: {
						width: '100%',
						height: 0,
					},
					legend: {
						position: 'top',
						maxLines: 100,
					},
					axisTitlesPosition: 'none',
					hAxis: {textPosition: 'none'},
					vAxis: {textPosition: 'none'}
				}}
				/>
		</Fragment>
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