import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
});

class AddOutcome extends Component {

	state = {
		open: false,
		outcomeArea: {
			title: '',
			copy: '',
			notes: '',
		},
	}
	
	handleOpen = event => {
		event.preventDefault();
		this.setState({
			open: true
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
	
	handleSubmit = event => {
		event.preventDefault();
		const { outcomeArea } = this.state
		this.props.dispatch({
			type: 'POST_OUTCOME_AREA',
			payload: outcomeArea
		})
		this.setState({
			outcomeArea: {
				title: '',
				copy: '',
				notes: '',
			}
		})
	}

	handleClose = event => {
		this.setState({
			open: false,
		})
	}

  render() {
		const { classes } = this.props;
		const { outcomeArea, open } = this.state;
		return (
			<div>
				<Button variant="outlined" onClick={this.handleOpen}>
					Add Outcome Area
					<FontAwesomeIcon icon="plus" className={classes.rightIcon} />
				</Button>
				<form id="outcome-form" onSubmit={this.handleSubmit}>
					<Dialog
						open={open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Add OutcomeArea</DialogTitle>
						<DialogContent>
							<TextField
								label="Title"
								type="text"
								name="title"
								fullWidth
								value={outcomeArea.title}
								onChange={this.handleChange}
							/>
							<TextField
								label="Copy text"
								type="text"
								name="copy"
								fullWidth
								value={outcomeArea.copy}
								onChange={this.handleChange}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button type="submit" form="outcome-form" color="primary">
								Submit
							</Button>
						</DialogActions>
					</Dialog>
				</form>
			</div>
		);
  }
}

AddOutcome.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  outcomes: reduxState.outcomes
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(AddOutcome);