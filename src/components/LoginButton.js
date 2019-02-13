import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core';

import { apiAction } from '../redux/actions'
import DialogForm from './DialogForm';
import LoginFields from '../views/Admin/ManageUsers/Login.fields';
import axios from 'axios';

const dialogText = 'This form allows site admins to log in. If you have reached this form in error, please click CANCEL.'

const styles = theme => ({
  root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
});

class LoginButton extends Component {
	state = {
		username: '',
		password: '',
		open: false,
		showPassword: false,
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
		const { apiAction } = this.props;
		const { username, password } = this.state;
		if (username && password) {
			apiAction({ 
				baseUrl: '/api/user',
				id: 'login',
				method: "POST",
				data: { username, password },
				label: 'User'
			});
		}
		this.handleClose()
	}

	handleTogglePassword = event => {
		const { showPassword } = this.state;
		this.setState({
			showPassword: !showPassword
		})
	}

	handleClose = event => {
		this.setState({
			open: false
		})
	}

  render() {
		const { classes } = this.props;
		const { open, showPassword, username, password } = this.state;
    return (
			<Fragment>
				<IconButton size="small" onClick={this.handleOpen}>
					<FontAwesomeIcon icon="user-circle" size="xs" color="white"/>
				</IconButton>
				<DialogForm
					open={open}
					dialogTitle={'Admin Login'}
					dialogDescription={dialogText}
					formId={'login-form'}
					onSubmit={this.onSubmit}
					handleClose={this.handleClose}
					formFields={
						<LoginFields
							handleChange={this.handleChange}
							handleTogglePassword={this.handleTogglePassword}
							showPassword={showPassword}
							username={username}
							pasword={password}
						/>
					}
				/>
			</Fragment>
    );
  }
}

LoginButton.propTypes = {
	classes: PropTypes.object.isRequired,
	apiAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user, fetching }) => ({ user, fetching })

export default compose(
	withRouter,
	connect(mapStateToProps, { apiAction }),
	withStyles(styles),
)(LoginButton)