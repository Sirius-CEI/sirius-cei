import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
		newCard: {
			title: '',
			image: '',
			url: '',
			category_id: '',
		}
	}

	// handle changes in the form inputs
	handleChange = event => {
		this.setState({
			newCard: {
				...this.state.newCard,
				[event.target.name]: event.target.value,
			}
		});
	}

		render() {
		const { classes, outcomes } = this.props;
		const { newCard } = this.state;
		return (
			<Fragment>
				<TextField 
					id="card-title" 
					type='text' 
					label="title" 
					name="title" 
					margin="dense"
					fullWidth
					value={newCard.title} 
					onChange={this.handleChange} 
				/>
				<TextField 
					id="card-image" 
					type='text' 
					label="image" 
					name="image" 
					margin="dense" 
					fullWidth
					value={newCard.image} 
					onChange={this.handleChange} 
				/>
				<TextField 
					id="card-url" 
					className={classes.description} 
					type='url' label="url" 
					name="url" 
					margin="dense"
					fullWidth
					value={newCard.url} 
					onChange={this.handleChange} 
				/>
				<TextField
					label="outcome area"
					name="category_id"
					select
					margin="dense"
					fullWidth
					value={newCard.category_id}
					onChange={this.handleChange}
				>
					{outcomes.map((item) => (
						<MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
					))}
				</TextField>
			</Fragment>
		);
  }
}

AddCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  outcomes: reduxState.outcomes
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(AddCard);