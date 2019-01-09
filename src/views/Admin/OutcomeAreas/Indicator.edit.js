import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fab from '@material-ui/core/Fab';

import DialogForm from '../../../components/DialogForm';
import IndicatorFields from './Indicator.fields';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
});

class EditIndicator extends Component {

	state = {
		open: false,
		updates: {
			title: '',
			copy: '',
			notes: '',
			active: false,
			order: 100,
			outcomeId: '',
		},
		id: '',
	};

	handleOpen = event => {
		event.preventDefault();
		const { indicator } = this.props;
		const { updates } = this.state;
		const setUpdates = {};
		Object.keys(updates).forEach((key) => setUpdates[key] = indicator[key])
		this.setState({
			open: true,
			updates: {
				...setUpdates
			},
			id: indicator._id,
		})
	}
	
	handleClose = () => {
		this.setState({
			open: false,
			updates: {
				title: '',
				copy: '',
				notes: '',
				active: false,
				order: 100,
				outcomeId: ''
			},
			id: ''
		});  
	};

	handleChange = event => {
		event.preventDefault();
		this.setState({
			...this.state,
			updates: {
				...this.state.updates,
				[event.target.name]: event.target.value
			}
		})
	}

	onSubmit = event => {
		event.preventDefault();
		const { id, updates } = this.state;
		console.log(`updates:`, updates);
		this.props.dispatch({
			type: 'UPDATE_INDICATOR',
			payload: updates,
			outcomeId: updates.outcomeId,
			id: id
		});
		this.handleClose();
	}

	render() {
		const { outcomes } = this.props;
		const { open, updates } = this.state;
		return (
			<Fragment>
				<Fab size="medium" onClick={this.handleOpen}>
					<FontAwesomeIcon icon="edit" />
				</Fab>
				<DialogForm
					open={open}
					dialogTitle={'Edit Indicator'}
					formId={'edit-indicator'}
					formFields={
						<IndicatorFields
							handleChange={this.handleChange}
							outcomes={outcomes}
							indicator={updates}
							editMode={true}
						/>
					}
					onSubmit={this.onSubmit}
					handleClose={this.handleClose}
				/>
			</Fragment>
		);
	}
}

EditIndicator.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
	outcomes: reduxState.outcomes,
	indicator: reduxState.indicator
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(EditIndicator);