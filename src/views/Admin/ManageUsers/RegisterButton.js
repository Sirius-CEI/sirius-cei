import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class RegisterButton extends Component {
	state = {
		username: '',
		password: '',
		open: false,
	}

	handleOpen = event => {
		this.setState({
			open: true
		})
	}

	handleChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	register = event => {
		event.preventDefault();
		const { username, password } = this.state;
    if (username && password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
        },
			});
			this.handleClose();
    } else {
      this.props.dispatch({ type: 'AUTH_INPUT_ERROR' });
    }
	}

	handleClose = event => {
		this.setState({
			open: false
		})
	}

  render() {
		const { open, username, password } = this.state;
    return (
			<div>
				<Button variant="outlined" onClick={this.handleOpen}>Register User</Button>
				<form id="register-form" onSubmit={this.register}>
					<Dialog
						open={open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Register User</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
								id="register-username"
								label="email"
								name="username"
								type="email"
								margin="dense"
								fullWidth
								required
								value={username}
								onChange={this.handleChange}
							/>
							<TextField
								id="register-password"
								label="password"
								name="password"
								type="password"
								margin="dense"
								fullWidth
								required
								value={password}
								onChange={this.handleChange}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button type="submit" form="register-form" color="primary">
								Submit
							</Button>
						</DialogActions>
					</Dialog>
				</form>
			</div>
    );
  }
}

export default connect()(RegisterButton);