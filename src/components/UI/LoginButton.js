import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class LoginButton extends Component {
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

	login = event => {
		// event.preventDefault();
		const { username, password } = this.state;
    if (username && password) {
      this.props.dispatch({
        type: 'LOGIN',
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
		const { open } = this.state;
		console.log(this.props);
    return (
			<div>
				<Button variant="outlined" onClick={this.handleOpen}>Admin Login</Button>
				<form id="login-form" onSubmit={this.login}>
					<Dialog
						open={open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Admin Login</DialogTitle>
						<DialogContent>
							<DialogContentText>This form allows site admins to log in. If you have reached this form in error, please click CANCEL.</DialogContentText>
							<TextField
								autoFocus
								id="username"
								label="username"
								name="username"
								type="email"
								fullWidth
								value={this.state.username}
								onChange={this.handleChange}
							/>
							<TextField
								id="password"
								label="password"
								name="password"
								type="password"
								fullWidth
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button type="submit" form="login-form" color="primary">
								Log In
							</Button>
						</DialogActions>
					</Dialog>
				</form>
			</div>
    );
  }
}

const mapStateToProps = state => ({ state });

export default withRouter(connect(mapStateToProps)(LoginButton));
