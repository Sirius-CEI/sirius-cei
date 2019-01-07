import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import AddCard from './AddCard';
import CardItems from './CardItems';

const styles = theme => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'flex-end',
	},
	grow: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
});

class CardExtension extends Component {

	state = {
		open: false,
	};

	handleOpen = () => {
		this.setState({
			open: true
		});
	};
	
	handleClose = () => {
		this.setState({
			open: false 
		});  
	};
	
	addCard = event => {
		event.preventDefault();
		const { newCard } = this.state;
		const { dispatch, handleClose } = this.props;
		dispatch({ type: 'ADD_CARD', payload: newCard })
		handleClose();
		this.setState({
			newCard: {
				title: '',
				image: '',
				url: '',
				category_id: '',
			}
		});
	}

	deleteCard = (id) => {
		this.props.dispatch({
			type: 'DELETE_CARD',
			payload: id
		});
	}

	// display cards on page load
	componentDidMount() {
		this.getCards();
	}

	// get cards
	getCards() {
		this.props.dispatch( { type: 'GET_CARDS' } );
	}

	// edit card
	editCard() {
		this.props.dispatch({ type: 'EDIT_CARD' });
	}

	render() {
		const { classes } = this.props;
		const { open } = this.state;
		return (
			<div className={classes.root}>
				<Button variant="outlined" onClick={this.handleOpen}>
					Add Card
					<FontAwesomeIcon icon="plus" className={classes.rightIcon} />
				</Button>
				<form id="add-card-form" onSubmit={this.addCard}>
					<Dialog
						open={open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Add Card</DialogTitle>
						<DialogContent>
							<AddCard />
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button type="submit" form="add-card-form" color="primary">
								Submit
							</Button>
						</DialogActions>
					</Dialog>
				</form>
				<CardItems />
			</div>
		);
	}
}

CardExtension.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(CardExtension);