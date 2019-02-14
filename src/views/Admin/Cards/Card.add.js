import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DialogForm from '../../../components/DialogForm';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import CardFields from './Card.fields';
import { apiAction } from '../../../redux/actions'

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
});

class AddCard extends Component {

	state = {
		open: false,
		newCard: {
			title: '',
			image: '',
			url: '',
			outcome_id: '',
		}
	}

	handleOpen = event => {
		const {outcomeId} = this.props || ''
		this.setState({
			...this.state,
			open: true,
			newCard: {
				...this.state.newCard,
				outcome_id: outcomeId
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
		const { dispatch } = this.props;
		const { newCard } = this.state;
		console.log(newCard);
		const args = {
			baseUrl: "/api/cards",
			method: "POST",
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
			}
		});
	}

		render() {
		const { outcomeId } = this.props;
		const { newCard, open } = this.state;
		return (
			<Fragment>
				<Fab color="secondary" aria-label="Add action card" onClick={this.handleOpen}>
					<FontAwesomeIcon icon="plus" />
				</Fab>
				<DialogForm
					open={open}
					dialogTitle={'Add Action Card'}
					formId={`add-action-card-${outcomeId}`}
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
			</Fragment>
		);
  }
}

AddCard.propTypes = {
	classes: PropTypes.object.isRequired,
};


export default compose(
	connect(),
	withStyles(styles)
)(AddCard);