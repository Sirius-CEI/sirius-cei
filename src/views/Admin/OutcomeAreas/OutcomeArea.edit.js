import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CardHeader, CardActionArea } from '@material-ui/core';

import DialogForm from '../../../components/DialogForm';
import OutcomeAreaFields from './OutcomeArea.fields';

class EditOutcome extends Component {

	state = {
		open: false,
		outcomeArea: {
			_id: '',
			title: '',
			copy: '',
			route: '',
			image: '',
			active: false,
			order: 100,
			notes: '',
			indicators: []
		},
		id: '',
	}
	
	handleOpen = event => {
		const { item } = this.props;
		this.setState({
			open: true,
			outcomeArea: item,
			id: item._id
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
		const { outcomeArea, id } = this.state;
		const updates = Object.assign({}, outcomeArea);
		delete updates._id;
		this.props.dispatch({
			type: 'UPDATE_OUTCOME_AREA',
			payload: outcomeArea,
			id: id,
		});
		this.handleClose();
	}

	handleClose = event => {
		this.setState({
			open: false,
			outcomeArea: {
				_id: '',
				title: '',
				copy: '',
				route: '',
				image: '',
				active: false,
				order: 100,
				notes: '',
				indicators: []
			},
			id: '',
		})
	}

  render() {
		const { item } = this.props;
		const { outcomeArea, open } = this.state;
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
					formId={'edit-outcome-area'}
					formFields={
						<OutcomeAreaFields
							outcomeArea={outcomeArea}
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