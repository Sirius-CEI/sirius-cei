import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddIndicator extends Component {

	state = {
		open: false,
		newIndicator: {
			title: '',
			copy: '',
			notes: '',
		},
		id: this.props.item._id
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

	addIndicator = event => {
		event.preventDefault();
		console.log(this.state);
		const { newIndicator, id } = this.state;
		this.props.dispatch({
			type: 'POST_INDICATOR',
			payload: newIndicator,
			id: id,
		});
		this.handleClose(event);
	}

	updateIndicator = event => {

	}

	handleClose = event => {
		this.setState({
			open: false,
		})
	}

  render() {
		const { open, title, copy, notes, id } = this.state;
		const { className, outcomes } = this.props;
    return (
			<Fragment>
				<Fab aria-label="Add indicator" color="primary" size="small" onClick={this.handleOpen} className={className}>
					<FontAwesomeIcon icon="plus" />
				</Fab>
				<form id="indicator-form" onSubmit={this.addIndicator}>
					<Dialog
						open={open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Add Indicator</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
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
			</Fragment>
    );
  }
}

const mapStateToProps = state = {
	outcomes: state.outcomes,
}

export default connect(mapStateToProps)(AddIndicator);