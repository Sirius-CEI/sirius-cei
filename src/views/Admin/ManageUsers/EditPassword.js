import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	Button,
	TextField,
} from '@material-ui/core'

import DialogForm from '../../../components/DialogForm';
import { apiAction } from '../../../redux/actions';

class EditPassword extends Component {
	state = {
		password: '',
		password2: '',
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
		const { password, password2 } = this.state;
		const { apiAction } = this.props;
		if ( password === password2 ) {
			apiAction({
				method: 'PUT',
				baseUrl: 'api/user',
				id: 'password',
				data: {
					password
				},
			})
			this.handleClose();
		} else {
			alert('Passwords must match.')
		}
	}

	handleClose = event => {
		this.setState({
			password: '',
			password2: '',
			open: false
		})
	}

	handleChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	formFields = () => {
		return (
			<Fragment>
				<TextField
					required
					autoFocus
					fullWidth
					variant="outlined"
					label="Password"
					name="password"
					type="password"
					margin="normal"
					value={this.state.password}
					onChange={(e)=>this.handleChange(e)}
				/>
				<TextField
					required
					fullWidth
					variant="outlined"
					label="Retype password"
					name="password2"
					type="password"
					margin="normal"
					value={this.state.password2}
					onChange={(e)=>this.handleChange(e)}
				/>
			</Fragment>
		)
	}

  render() {
		const { open } = this.state;
    return (
			<Fragment>
				<Button variant="outlined" onClick={this.handleOpen}>Change Password</Button>
				<DialogForm
					formId='change-password'
					open={open}
					dialogTitle='Change Password'
					formFields={<this.formFields />}
					onSubmit={this.onSubmit}
					handleClose={this.handleClose}
				/>
			</Fragment>
    );
  }
}

EditPassword.propTypes = {
	apiAction: PropTypes.func.isRequired,
};

export default connect(null, {apiAction})(EditPassword);