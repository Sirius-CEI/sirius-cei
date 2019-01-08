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
});

class PasswordReset extends Component {
  state = {
    password: '',
    confirm: '',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_TOKEN' });
  }

  // on click reset password in db if passwords match
  resetPassword = (event) => {
    event.preventDefault();
    if (this.state.username === this.state.password) {
      this.props.dispatch({
        type: 'EDIT_PASSWORD',
        payload: {
          password: this.state.password,
        },
      });
    } else {
        console.log('error resetting password');
        alert('error editing password')
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    console.log('handle change', event.target.value);
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {JSON.stringify('props.match -->')}
        {JSON.stringify(this.props.match)}
        <center>
          <form onSubmit={this.resetPassword}>
            <h1>Reset Password</h1>
            <div>
              <label htmlFor="password">
              Password:
              <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
              />
              </label>
              <br></br>
              <label htmlFor="password">
              confirm:
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