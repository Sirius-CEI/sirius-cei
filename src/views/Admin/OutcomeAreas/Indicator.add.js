import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import DialogForm from '../../../components/DialogForm';
import IndicatorFields from './Indicator.fields';

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

class AddIndicator extends Component {

	state = {
		open: false,
		title: '',
		copy: '',
		notes: '',
		outcome_id: ''
	}	

	handleOpen = event => {
		this.setState({
			open: true
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
		const { outcomeId } = this.state;
		var newIndicator = Object.assign({}, this.state);
		delete newIndicator.open;
		delete newIndicator.outcomeId;
		this.props.dispatch({
			type: 'POST_INDICATOR',
			payload: newIndicator,
			id: outcomeId,
		});
		this.handleClose();
	}

	handleClose = event => {
		this.setState({
			open: false,
			title: '',
			copy: '',
			notes: '',
			outcomeId: ''
		})
	}

  render() {
		const { open } = this.state;
		const { classes, outcomes } = this.props;
    return (
			<div>
				<Button variant="outlined" onClick={this.handleOpen}>
					Indicator
					<FontAwesomeIcon icon="plus" className={classes.rightIcon} />
				</Button>
				<DialogForm
					open={open}
					dialogTitle={'Add Indicator'}
					formId={'add-indicator'}
					formFields={
						<IndicatorFields
							outcomes={outcomes}
							handleChange={this.handleChange}
							indicator={this.state}
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

AddIndicator.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	outcomes: state.outcomes
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(AddIndicator);