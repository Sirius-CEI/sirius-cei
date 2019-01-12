import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
		this.setState({
			...this.state,
			open: true,
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
		console.log('adding card')
		event.preventDefault();
		this.props.dispatch({ type: 'ADD_CARD', payload: this.state.newCard })
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
		const { classes } = this.props;
		const { newCard, open } = this.state;
		return (
			<div>
				<Button variant="outlined" onClick={this.handleOpen}>
					Card
					<FontAwesomeIcon icon="plus" className={classes.rightIcon} />
				</Button>
				<DialogForm
					open={open}
					dialogTitle={'Add Action Card'}
					formId={'add-action'}
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

AddCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default compose(
	connect(),
	withStyles(styles)
)(AddCard);