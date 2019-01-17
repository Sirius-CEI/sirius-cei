import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CardHeader, CardActionArea } from '@material-ui/core';

import DialogForm from '../../../components/DialogForm';
import OutcomeAreaFields from './OutcomeArea.fields';

class EditOutcome extends Component {

	state = {
		open: false,
		updates: {
			title: '',
			copy: '',
			route: '',
			active: false,
			order: 100,
			notes: '',
		},
		id: '',
	}
	
	handleOpen = event => {
		const { item } = this.props;
		const { updates } = this.state;
		const setUpdates = {};
		Object.keys(updates).forEach((key) => setUpdates[key] = item[key])
		this.setState({
			open: true,
			updates: {
				...setUpdates
			},
			id: item._id
		})
	}

	// handle changes in the form inputs
	handleChange = event => {
		this.setState({
			...this.state,
			updates: {
				...this.state.updates,
				[event.target.name]: event.target.value,
			}
		});
	}
	
	onSubmit = event => {
		event.preventDefault();
		const { updates, id } = this.state;
		this.props.dispatch({
			type: 'UPDATE_OUTCOME_AREA',
			payload: updates,
			id: id,
		});
		this.handleClose();
	}

	handleClose = event => {
		this.setState({
			open: false,
			updates: {
				title: '',
				copy: '',
				route: '',
				active: false,
				order: 100,
				notes: '',
			},
			id: '',
		})
	}

  render() {
		const { item } = this.props;
		const { updates, open } = this.state;
		return (
			<Fragment>
				<CardActionArea onClick={this.handleOpen}>
					<CardHeader
						title={item.title}
						titleTypographyProps={{
							variant: 'h6',
							color: 'primary'
						}}
					/>
				</CardActionArea>
				<DialogForm
					open={open}
					dialogTitle={'Edit Outcome Area'}
					formId={item._id}
					formFields={
						<OutcomeAreaFields
							outcomeArea={updates}
							handleChange={this.handleChange}
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

export default connect()(EditOutcome);