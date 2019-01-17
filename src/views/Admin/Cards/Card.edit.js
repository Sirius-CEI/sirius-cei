import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import DialogForm from '../../../components/DialogForm';
import Button from '@material-ui/core/Button';

import CardFields from './Card.fields'

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	grow: {
		flexGrow: 1,
	},
});

class EditCard extends Component {

	state = {
		open: false,
		newCard: {
			title: '',
			image: '',
			url: '',
			outcome_id: '',
			_id: '',
		}
	}

	handleOpen = event => {
		const { card } = this.props;
		this.setState({
			...this.state,
			open: true,
			newCard: {
				title: card.title,
				image: card.image,
				url: card.url,
				outcome_id: card.outcome_id,
				_id: card._id
			}
		})
	}

	// handle changes in the form inputs
	handleChange = event => {
		event.preventDefault();
		this.setState({
			newCard: {
				...this.state.newCard,
				[event.target.name]: event.target.value,
			}
		});
	}

	onSubmit = event => {
		event.preventDefault();
		this.props.dispatch({ type: 'EDIT_CARD', payload: this.state.newCard })
		this.handleClose();	
	}

	handleClose = event => {
		this.setState({
			open: false,
			newCard: {
				title: '',
				image: '',
				url: '',
				outcome_id: '',
				_id: ''
			}
		});
	}

		render() {
		const { classes } = this.props;
		const { newCard, open } = this.state;
		return (
			<div>
				<Button color="primary" onClick={this.handleOpen}>
					Edit
				</Button>
				<DialogForm
					open={open}
					dialogTitle={'Edit Action Card'}
					formId={'edit-action'}
					formFields={
						<CardFields
							handleChange={this.handleChange}
							newCard={newCard}
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

EditCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default compose(
	connect(),
	withStyles(styles)
)(EditCard);