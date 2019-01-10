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
		justifyContent: 'center',
	},
	grow: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	button: {
		height: 44,
		justifySelf: 'flex-end',
		alignSelf: 'flex-end',
		
	}
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
	
	deleteCard = (id) => {
		this.props.dispatch({
			type: 'DELETE_CARD',
			payload: id
		});
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
				<form id="add-card-form" onSubmit={this.addCard}>
					<Dialog
						open={open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Add Card</DialogTitle>
						<DialogContent>
							<AddCard handleClose={this.handleClose}/>
						</DialogContent>
						<DialogActions>
							{/* <Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button type="submit" form="add-card-form" color="primary">
								Submit
							</Button> */}
						</DialogActions>
					</Dialog>
				</form>
				
				<CardItems />
				<Button className={classes.button} variant="outlined" onClick={this.handleOpen}>
					Add Card
					<FontAwesomeIcon icon="plus" className={classes.rightIcon} />
				</Button>
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