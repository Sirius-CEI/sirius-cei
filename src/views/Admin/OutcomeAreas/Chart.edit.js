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

class EditChart extends Component {

	state = {
		open: false,
		id: '',
		chart: {
			title: '',
			description: '',
			copy: '',
			toggleText: '',
			query: '',
			citation: '',
			notes: '',
			indicator: '',
			active: false,
			order: 100,
			_id: '',
		}
	}	

	handleOpen = event => {
		const { chart } = this.props;
		this.setState({
			...this.state,
			open: true,
			id: chart._id,
			chart: chart
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
		var updates = Object.assign({}, this.state);
		delete updates.open;
		delete updates._id;
		this.props.dispatch({
			type: 'UPDATE_CHART',
			payload: updates,
			id: this.state._id
		});
		this.handleClose();
	}

	handleClose = event => {
		this.setState({
			open: false,
			id: '',
			chart: {
				title: '',
				description: '',
				copy: '',
				toggleText: '',
				query: '',
				citation: '',
				notes: '',
				indicator: '',
				active: false,
				order: 100,
				_id: '',
			}
		})
	}

  render() {
		const { open, chart } = this.state;
		const { classes } = this.props;
    return (
			<div>
				<Button variant="outlined" onClick={this.handleOpen}>
					Chart
					<FontAwesomeIcon icon="plus" className={classes.rightIcon} />
				</Button>
				<DialogForm
					open={open}
					dialogTitle={'Edit Chart'}
					formId={'edit-chart'}
					formFields={
						<ChartFields
							handleChange={this.handleChange}
							chart={chart}
							editMode={true}
						/>
					}
					onSubmit={this.onSubmit}
					handleClose={this.handleClose}
				/>
			</div>
    );
  }
}

EditChart.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	indicator: state.indicator
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(EditChart);