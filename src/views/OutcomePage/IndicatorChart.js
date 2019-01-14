import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { Card, CardHeader, CardContent, Button, Grid, Typography } from '@material-ui/core'

// import MapChart from './IndicatorChart.map';
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
		const { indicator, classes } = this.props;
		const { display } = this.state;
		return (
			indicator && (
			<Card className={classes.root}>
				<CardHeader
					title="Chart Title"
					titleTypographyProps={{
						variant: "h6",
						align: 'center'
					}}
				/>
				<CardContent>
					{/* {
						this.state.display === 'location' ? (
							<MapChart indicator={indicator}/>
						) : (
							<LineChart indicator={indicator}/>
						)
					} */}
						<LineChart indicator={indicator} />
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

export default withStyles(styles)(GraphIndicator);