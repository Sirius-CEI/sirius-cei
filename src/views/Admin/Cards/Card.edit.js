import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import DialogForm from '../../../components/DialogForm';
import CardFields from './Card.fields';
import { apiAction } from '../../../redux/actions';

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
		const { newCard } = this.state;
		const { dispatch } = this.props;
		const args = {
			baseUrl: "/api/cards",
			method: "PUT",
			id: newCard._id,
			label: "CARDS",
			data: newCard
		}
		dispatch(apiAction(args));
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
		const { newCard, open } = this.state;
		return (
			<Fragment>
				<Button color="primary" onClick={this.handleOpen}>
					Edit
				</Button>
				<DialogForm
					open={open}
					dialogTitle={'Edit Action Card'}
					formId={`edit-${newCard._id}`}
					formFields={
						<CardFields
							handleChange={this.handleChange}
							newCard={newCard}
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

// EditCard.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

export default compose(
	connect(),
	withStyles(styles)
)(EditCard);