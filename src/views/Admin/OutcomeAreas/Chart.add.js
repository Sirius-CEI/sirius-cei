import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import DialogForm from '../../../components/DialogForm';
import ChartFields from './Chart.fields';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	test: {
		border: 'solid tomato 1px'
	}
});

class AddChart extends Component {

	state = {
		open: false,
		title: '',
		description: '',
		copy: '',
		toggleText: '',
		query: '',
		citation: '',
		notes: '',
		indicator_id: '',
	}	

	handleOpen = event => {
		const { indicator } = this.props;
		this.setState({
			...this.state,
			open: true,
			indicator_id: indicator._id,
		})
	}

	handleChange = event => {
		event.preventDefault();
		this.setState({
			...this.state,
			[event.target.name]: event.target.value
		})
	}

	onSubmit = event => {
		event.preventDefault();
		var newChart = Object.assign({}, this.state);
		delete newChart.open;
		this.props.dispatch({
			type: 'POST_CHART',
			payload: newChart,
		});
		this.handleClose();
	}

	handleClose = event => {
		this.setState({
			open: false,
			title: '',
			description: '',
			copy: '',
			toggleText: '',
			query: '',
			citation: '',
			notes: '',
			indicator_id: '',
		})
	}

  render() {
		const { open } = this.state;
		const { classes } = this.props;
    return (
			<div>
				<Button variant="outlined" onClick={this.handleOpen}>
					Chart
					<FontAwesomeIcon icon="plus" className={classes.rightIcon} />
				</Button>
				<DialogForm
					open={open}
					dialogTitle={'Add Chart'}
					formId={'add-chart'}
					formFields={
						<ChartFields
							handleChange={this.handleChange}
							chart={this.state}
							editMode={false}
						/>
					}
					onSubmit={this.onSubmit}
					handleClose={this.handleClose}
				/>
			</div>
    );
  }
}

AddChart.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	indicator: state.indicator
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(AddChart);