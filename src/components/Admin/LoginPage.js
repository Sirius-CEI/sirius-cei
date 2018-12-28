import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
})

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'AUTH_INPUT_ERROR' });
    }
  } // end login

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
		const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form onSubmit={this.login}>
					<TextField
						id="login-username"
						label="Username"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<TextField
						id="login-password"
						label="Password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<Button type="submit">Log In</Button>
				</form>
      </div>
    );
  }
}

LoginPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
});

export default compose(
	connect(mapStateToProps),
  withStyles(styles),
)(LoginPage);
