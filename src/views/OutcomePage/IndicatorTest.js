import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

import IndicatorChart from './IndicatorChart';
import IndicatorText from './IndicatorText';

const styles = theme => ({
  root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	chart: {
		backgroundColor: theme.palette.grey[400],
	},
	chartPlaceholder: {
		minHeight: 180,
		height: '100%'
	},
	text: {
		backgroundColor: theme.palette.gold.light,
	},
	padded: {
		padding: theme.spacing.unit * 2,
	},
	test: {
		border: 'solid tomato 1px'
	},
});

class IndicatorTest extends Component {
	state = {
    display: 'race',
  };

  handleDisplay = (event, display) => {
    console.log(display);
    
    this.setState({ display: display});
    console.log(this.state);
    
	}
	
  render() {
		const { classes, indicator, order } = this.props;
		const { display } = this.state;
		return (
			<div className={classes.root}>
				<Grid
					container
					direction="row"
					alignItems="stretch"
					direction={order%2 === 0 ? 'row' : 'row-reverse'}
					className={classes.grey}
				>
					<Grid item xs={12} md className={classes.chart}>
						<div className={classes.padded}>
							<Paper className={classes.chartPlaceholder}>
							</Paper>
						</div>
					</Grid>
					<Grid item xs={12} md className={classes.text}>
						<div className={classes.padded}>
							<Grid
								container
								spacing={16}
								direction="column"
							>
								<Grid item>
									<Typography
										variant="h4"
										align="center"
									>
										{indicator.title}
									</Typography>
								</Grid>
								<Grid item>
									<Typography
										variant="body1"
										align="justify"
									>
										{indicator.copy}
									</Typography>
								</Grid>
								<Grid item>
									<ToggleButtonGroup exclusive value={display} onChange={this.handleDisplay}>
										<ToggleButton value="race">Race/Ethnicity</ToggleButton>
										<ToggleButton value="location">Location</ToggleButton>
										<div className={classes.grow} />
									</ToggleButtonGroup>
								</Grid>
							</Grid>
						</div>
					</Grid>
					<Grid item xs={false} md={1} />
				</Grid>
			</div>
		);
  }
}

const mapStateToProps = reduxState => ({
  outcomes: reduxState.outcomes,
});

IndicatorTest.propTypes = {
	classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(IndicatorTest));