import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const styles = theme => ({
  root: {
  },
});

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
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
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className={classes.alert}
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form className={classes.root} onSubmit={this.login}>
          <TextField
            required
            label="Username"
            className={classes.username}
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
          <br></br>
          <TextField
            required
            label="Password"
            className={classes.password}
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <Button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </Button>
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

LoginPage.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
