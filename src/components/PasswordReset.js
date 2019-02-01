import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

const styles = theme => ({
  img: {
      height: 'auto',
      width: 'auto',
      maxHeight: '150px',
      maxWidth: '200px',
  },
  paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
  },
  form: {
    
  }
});

class PasswordReset extends Component {
  state = {
    username: '',
    password: '',
    confirm: '',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_TOKEN', payload: this.props.match.params.token });
  }

  // on click reset password in db if passwords match
  resetPassword = (event) => {
    event.preventDefault();
    if (this.state.password === this.state.confirm) {
      this.props.dispatch({
        type: 'RESET_PASSWORD',
        payload: {
          username: this.state.username,
          password: this.state.password,
        }
      });
    } else {
        alert('Passwords Must Match')
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <center>
          <form className={classes.form} onSubmit={this.resetPassword}>
            <h1>Reset Password</h1>
            <div>
              <label htmlFor="username">
              Email:
              <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
              />
              </label>
              <label htmlFor="password">
              New Password:
              <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
              />
              </label>
              <label htmlFor="password">
              Confirm Password:
              <input
                  type="password"
                  name="confirm"
                  value={this.state.confirm}
                  onChange={this.handleInputChangeFor('confirm')}
              />
              </label>
            </div>
            <div>
                <input
                className="log-in"
                type="submit"
                name="submit"
                value="Reset Password"
                />
            </div>
          </form>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
PasswordReset.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
cards: reduxState.cards,
errors: reduxState.errors,
});

export default compose(
  connect(mapReduxStateToProps),
  withStyles(styles)
)(PasswordReset);