import React, { Component } from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper, Typography, InputAdornment, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Lock from '@material-ui/icons/Lock';

const styles = theme => ({
  root: {
    textAlign: 'center',
    width: '30%',
    padding: 40,
    margin: '20px auto',
    borderRadius: '4px',
  },
  loginBtn: {
    marginTop: 30,
  },
  textField: {
    width: '100%',
    marginTop: 30,
  },
  title: {
    color: '#4c2a74',
    textTransform: 'uppercase',
    letterSpacing: '1.53px',
    lineHeight: '1em',
    marginBottom: 30,
  }
});

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Paper className={classes.root}>
          <form onSubmit={this.registerUser}>

            <Typography className={classes.title}>
              Register New User
            </Typography>

            <TextField
              required
              variant="outlined"
              margin="normal"
              label="Create Username"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <br></br>
            <TextField
              required
              variant="outlined"
              margin="normal"
              label="Create Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              type={this.state.showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
              <Button
                className={classes.loginBtn}
                type="submit"
                name="submit"
                value="Register"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
          </form>
        </Paper>

        <center>
          <Button
            className={classes.registerBtn}
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </Button>
        </center>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

RegisterPage.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));

