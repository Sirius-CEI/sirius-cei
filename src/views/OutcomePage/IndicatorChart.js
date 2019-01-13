import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { Card, CardHeader, CardContent, Button, Grid, Typography } from '@material-ui/core'

import MapChart from './IndicatorChart.map';
import LineChart from './IndicatorChart.line'

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	buttons: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	test: {
		border: 'solid tomato 1px',
	}
});

class GraphIndicator extends Component {

  state = {
    display: 'race',
  };

  handleDisplay = (display) => {
		this.setState({ display: display });
  }

  render() {
		const { indicator, classes, charts, chartData } = this.props;
		const { display } = this.state;
		const indidcatorCharts = charts.filter(chart => (chart.indicator_id === indicator._id));
		const lineChart = indidcatorCharts.filter(chart => (chart.type === 'line'));
		const mapChart = indidcatorCharts.filter(chart => (chart.type === 'map'));

		return (
			indicator && chartData && (
			<Card className={classes.root}>
				<CardHeader
					title={indicator.chart_title}
					titleTypographyProps={{
						variant: "h6",
						align: 'center'
					}}
				/>
				<CardContent>
					{
						this.state.display === 'location' ? (
							mapChart[0] && <MapChart indicator={indicator} chart={mapChart[0]}/>
						) : (
							lineChart[0] && <LineChart indicator={indicator} chart={lineChart[0]}/>
						)
					}
					</CardContent>
					<CardContent className={classes.buttons}>
						<Typography
							align="center"
							variant="button"
							color="primary"
						>
							View information by:
						</Typography>
						<Grid
							container
							spacing={8}
							alignItems="center"
							justify="center"
						>
							<Grid item>
								<Button
									variant="contained"
									onClick={()=>this.handleDisplay('race')}
									disabled={display==='race'}
								>
									race/ethnicity
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									onClick={()=>this.handleDisplay('location')}
									disabled={display==='location'}
								>
									location
								</Button>
							</Grid>
						</Grid>
					</CardContent>
			</Card>)
		);
  }
}

GraphIndicator.propTypes = {
  classes: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
	charts: state.charts,
	chartData: state.chartData,
});

export default connect(mapStateToProps)(withStyles(styles)(GraphIndicator));