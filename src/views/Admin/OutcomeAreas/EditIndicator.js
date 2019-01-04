import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	container: {
		margin: 0,
		padding: 0,
		width: '100%'
	},
	copy: {
		background: theme.palette.grey[300],
		borderRadius: theme.shape.borderRadius,
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
	},
	graphContainer: {
		borderRadius: theme.shape.borderRadius,
		margin: theme.spacing.unit,
		padding: theme.spacing.unit,
	},
	graph: {
		display: 'flex',
		background: theme.palette.grey[300],
		flexGrow: 1,
		minHeight: 180,
	},
	gold: {
		flexGrow: 3,
		background: theme.palette.gold.light,
		minHeight: 180,
	},
	caps: {
		textTransform: 'uppercase',
		color: theme.palette.grey[800],
	},
	test: {
		border: 'solid tomato 1px',
	},
});

class EditIndicator extends Component {
	state = {
		...this.props.indicator
	}

	handleChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}

  render() {
		const { classes, indicator } = this.props;
		return (
			<form className={classes.root}>
				<Paper>
					<Grid container spacing={32} className={classes.container}>
						<Grid item xs={12}>
							<Typography align="center" variant="h4" color="primary">Title</Typography>
						</Grid>
						<Grid item xs={12} className={classes.copy}>
							<Typography variant="body1">Copy</Typography>
						</Grid>
						<Grid item xs={12} lg={6} className={classes.graphContainer}>
							<Grid container spacing={16} direction="row">
								<Grid item className={classes.graph} />
								<Grid item className={classes.grow}>
									<Grid container spacing={16} direction="column" className={classes.gold}>
										<Grid item>
											<Typography variant="h6" align="center" className={classes.caps}>Graph Title</Typography>
										</Grid>
										<Grid item>
											<Typography variant="body1">Graph Copy</Typography>
										</Grid>
									</Grid>
								</Grid>							
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</form>
		);
  }
}

EditIndicator.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
  indicator: reduxState.indicator
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(EditIndicator);