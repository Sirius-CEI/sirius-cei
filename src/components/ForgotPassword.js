import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

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
      form: {
          marginTop: 30,
          padding: 30,
          width: '100%',
    },
  });

class ForgotPassword extends Component {

  state = {
    username: '',
    showError: false,
    messageFromServer: '',
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }
  
  sendEmail = e => {
      e.preventDefault();
      this.props.handleClose();
      this.props.dispatch({ type: 'FORGOT_PASSWORD', payload: {
        username: this.state.username,
      }});
  }

  render() {
    const { classes } = this.props;
    return (
        <form className={classes.form} onSubmit={this.sendEmail}>
            <TextField
                required
                autoFocus
                variant="outlined"
                id="username"
                label="username"
                name="username"
                type="email"
                className={classes.textField}
                value={this.state.username}
                onChange={this.handleChange('username')}
            />
            <Button
              className="log-in"
              type="submit"
              name="submit"
              value="Reset Password"
              color="primary"
            >
            Request Password Reset
            </Button>
        </form>
    );
  }
}

ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default compose(
    withRouter,
    connect(),
    withStyles(styles),
)(ForgotPassword)