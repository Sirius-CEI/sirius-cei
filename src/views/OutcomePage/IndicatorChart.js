import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { Card, CardHeader, CardContent, CardActions, Button, Typography } from '@material-ui/core'

import MapChart from './IndicatorChart.map';
import LineChart from './IndicatorChart.line'

const styles = theme => ({
	root: {
		flexGrow: 1,
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

class GraphIndicator extends Component {

  state = {
    display: 'race',
  };

  handleDisplay = (display) => {
		this.setState({ display: display });
		console.log(this.state);   
  }

  render() {
		const { indicator, classes } = this.props;
		const { display } = this.state;
		return (
			<Card className={classes.root}>
				<CardHeader
					title="Chart Title"
					titleTypographyProps={{
						variant: "h6",
						align: 'center'
					}}
				/>
				<CardContent>
					{
						this.state.display === 'location' ? (
							<MapChart />
						) : (
							<LineChart />
						)
					}
					</CardContent>
					<CardActions>
						<Typography align="right">View information by:</Typography>
						<Button
							onClick={()=>this.handleDisplay('race')}
							disabled={display==='race'}
						>
							race/ethnicity
						</Button>
						<Button
							onClick={()=>this.handleDisplay('location')}
							disabled={display==='location'}
						>
							location
						</Button>
					</CardActions>
			</Card>
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