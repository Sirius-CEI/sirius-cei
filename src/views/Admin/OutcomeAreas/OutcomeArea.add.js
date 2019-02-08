import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

import DialogForm from '../../../components/DialogForm';
import OutcomeAreaFields from './OutcomeArea.fields';
import { setOutcomes } from '../../../redux/reducers/outcomeAreaReducer'

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
});

class AddOutcome extends Component {

	state = {
		open: false,
		outcomeArea: {
			title: '',
			copy: '',
			notes: '',
		},
	}
	
	handleOpen = event => {
		this.setState({
			open: true
		})
	}

	// handle changes in the form inputs
	handleChange = event => {
		this.setState({
			outcomeArea: {
				...this.state.outcomeArea,
				[event.target.name]: event.target.value,
			}
		});
	}
	
	onSubmit = event => {
		event.preventDefault();
		const { outcomeArea } = this.state
		this.props.dispatch({
			type: 'POST_OUTCOME_AREA',
			payload: outcomeArea
		})
		this.handleClose();
	}

	handleClose = event => {
		this.setState({
			open: false,
			outcomeArea: {
				title: '',
				copy: '',
				notes: '',
			},
		})
	}

  render() {
		const { classes } = this.props;
		const { outcomeArea, open } = this.state;
		return (
			<div>
				<Button variant="outlined" onClick={this.handleOpen}>
					Outcome Area
					<FontAwesomeIcon icon="plus" className={classes.rightIcon} />
				</Button>
				<DialogForm
					open={open}
					dialogTitle={'Add Outcome Area'}
					formId={'add-outcome-area'}
					formFields={
						<OutcomeAreaFields
							outcomeArea={outcomeArea}
							handleChange={this.handleChange}
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

AddOutcome.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  outcomes: reduxState.outcomes
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(AddOutcome);