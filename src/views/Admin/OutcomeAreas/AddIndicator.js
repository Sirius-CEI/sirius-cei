import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	test: {
		border: 'solid tomato 1px'
	}
});

class AddIndicator extends Component {

	state = {
		open: false,
		newIndicator: {
			title: '',
			copy: '',
			notes: '',
		},
		id: ''
	}	

	handleOpen = event => {
		event.preventDefault();
		this.setState({
			open: true
		})
	}

	handleChange = event => {
		event.preventDefault();
		this.setState({
			...this.state,
			newIndicator: {
				...this.state.newIndicator,
				[event.target.name]: event.target.value
			}
		})
	}

	handleIdChange = event => {
		event.preventDefault();
		this.setState({
			...this.state,
			[event.target.name]: event.target.value
		})
	}

	addIndicator = event => {
		event.preventDefault();
		const { newIndicator, id } = this.state;
		this.props.dispatch({
			type: 'POST_INDICATOR',
			payload: newIndicator,
			id: id,
		});
		this.handleClose();
	}

	updateIndicator = event => {

	}

	handleClose = event => {
		this.setState({
			open: false,
			id: '',
		})
	}

  render() {
		const { open, title, copy, notes, id } = this.state;
		const { classes, outcomes } = this.props;
    return (
			<div>
				<Button variant="outlined" onClick={this.handleOpen}>
					Add Indicator
					<FontAwesomeIcon icon="plus" className={classes.rightIcon} />
				</Button>
				<form id="indicator-form" onSubmit={this.addIndicator}>
					<Dialog
						open={open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Add Indicator</DialogTitle>
						<DialogContent>
							<TextField
								label="Outcome area"
								name="id"
								select
								margin="dense"
								fullWidth
								value={id}
								onChange={this.handleIdChange}
							>
								{outcomes.map((item) => (
									<MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
								))}
							</TextField>
							<TextField
								label="Indicator title"
								name="title"
								type="text"
								margin="dense"
								fullWidth
								value={title}
								onChange={this.handleChange}
							/>
							<TextField
								label="Copy"
								name="copy"
								type="text"
								margin="dense"
								fullWidth
								value={copy}
								onChange={this.handleChange}
							/>
							<TextField
								label="Notes"
								name="notes"
								type="text"
								margin="dense"
								fullWidth
								value={notes}
								onChange={this.handleChange}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button type="submit" form="indicator-form" color="primary">
								Submit
							</Button>
						</DialogActions>
					</Dialog>
				</form>
			</div>
    );
  }
}

AddIndicator.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	outcomes: state.outcomes
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(AddIndicator);