import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
		const { classes } = this.props;
		const { newCard } = this.state;
		return (
			<Fragment>
				<TextField 
					id="card-title" 
					type='text' 
					label="title" 
					name="title" 
					margin="normal" 
					variant="outlined"
					value={newCard.title} 
					onChange={this.handleChange} 
				/>
				<TextField 
					id="card-image" 
					type='text' 
					label="image" 
					name="image" 
					margin="normal" 
					variant="outlined"
					value={newCard.image} 
					onChange={this.handleChange} 
				/>
				<TextField 
					id="card-url" 
					className={classes.description} 
					type='url' label="url" 
					name="url" 
					margin="normal" 
					variant="outlined"
					value={newCard.url} 
					onChange={this.handleChange} 
				/>
				<Select
					variant="outlined"
					label="Outcome area"
					placeholder="Select outcome area..."
					open={this.state.open}
					onClose={this.handleClose}
					onOpen={this.handleOpen}
					value={newCard.category_id}
					onChange={this.handleChange}
					name="category_id"
					input={
						<OutlinedInput
							labelWidth={0}
							name="category_id"
							id="category-select"
							label="category"
							placeholder="category"
						/>
					}
				>
					<MenuItem value=''>Select outcome area...</MenuItem>
					<MenuItem value={1}>Macro View</MenuItem> 
					<MenuItem value={2}>Economic Development</MenuItem> 
					<MenuItem value={3}>Human Capital</MenuItem>
					<MenuItem value={4}>Access and Transit</MenuItem>
				</Select>
			</Fragment>
		);
  }
}

AddCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(AddCard);