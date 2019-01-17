import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      console.log('email state', this.state.username);
      this.props.dispatch({ type: 'FORGOT_PASSWORD', payload: {
        username: this.state.username,
      }});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.sendEmail}>
          <h1>Enter Email</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange('username')}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user,
});

export default connect(mapStateToProps)(ForgotPassword);