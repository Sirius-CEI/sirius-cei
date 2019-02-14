import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	Button,
	TextField,
} from '@material-ui/core'

import DialogForm from '../../../components/DialogForm';
import { apiAction } from '../../../redux/actions';

class EditEmail extends Component {
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
		const { apiAction, user } = this.props;

		apiAction({
			method: 'PUT',
			baseUrl: 'api/users',
			data: {
				username,
			},
			label: 'USERS',
			id: user._id
		})
		this.handleClose();
	}

	handleClose = event => {
		this.setState({
			username: '',
			open: false
		})
	}

	formFields = () => (
		<TextField
			required
			autoFocus
			fullWidth
			variant="outlined"
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
				<Button variant="outlined" onClick={this.handleOpen}>Update Email</Button>
				<DialogForm
					formId='update-email'
					open={open}
					dialogTitle='Update Email Address'
					formFields={<this.formFields />}
					onSubmit={this.onSubmit}
					handleClose={this.handleClose}
				/>
			</Fragment>
    );
  }
}

EditEmail.propTypes = {
	apiAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps, {apiAction})(EditEmail);