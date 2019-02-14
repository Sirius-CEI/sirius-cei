import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import crypto from 'crypto';

import {
	Button,
	TextField,
} from '@material-ui/core'

import DialogForm from '../../../components/DialogForm';
import { apiAction, apiGet } from '../../../redux/actions';

class RegisterButton extends Component {
	state = {
		username: '',
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

	onSubmit = event => {
		event.preventDefault();
		const { username } = this.state;
		const { apiAction } = this.props;
		const password = 	crypto.randomBytes(20).toString('hex');

		apiAction({
			method: 'POST',
			baseUrl: 'api/user',
			data: {
				username,
				password
			},
			label: 'USER'
		})
		this.sendEmail(username);
		this.getUsers();
		this.handleClose();
	}

	sendEmail = (username) => {
		const { apiAction} = this.props;
		apiAction({
			method: 'PUT',
			baseUrl: 'api/user',
			id: 'password-reset',
			data: {
				username,
			},
		})
	}

	getUsers = () => {
		const { apiGet } = this.props;
		apiGet({
			baseUrl: 'api/users',
			label: 'USERS'
		})
	}

	handleClose = event => {
		this.setState({
			open: false,
			username: ''
		})
	}

	formFields = () => (
		<TextField
			required
			autoFocus
			fullWidth
			variant="outlined"
			id="username"
			label="User email"
			name="username"
			type="email"
			margin="normal"
			value={this.state.username}
			onChange={(e)=>this.handleChange(e)}
		/>
	)

  render() {
		const { open } = this.state;
    return (
			<Fragment>
				<Button variant="outlined" onClick={this.handleOpen}>Register User</Button>
				<DialogForm
					formId='register-user'
					open={open}
					dialogTitle='Register User'
					formFields={<this.formFields />}
					onSubmit={this.onSubmit}
					handleClose={this.handleClose}
				/>
			</Fragment>
    );
  }
}

RegisterButton.propTypes = {
	apiAction: PropTypes.func.isRequired,
	apiGet: PropTypes.func.isRequired
};

export default connect(null, {apiAction, apiGet})(RegisterButton);