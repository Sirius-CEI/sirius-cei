import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
      console.log('email state', this.state.username);
      this.props.dispatch({ type: 'FORGOT_PASSWORD', payload: this.state.username});
    //   if(this.state.username === '') {
    //       this.setState({
    //           showError: false,
    //           messageFromServer: '',
    //       });
    //   } else {
    //       axios
    //         .post('/forgot-password', {
    //             username: this.state.username,
    //         })
    //         .then(response => {
    //             console.log('response data', response.data);
    //             if(response.data === 'email not in db') {
    //                 this.setState({
    //                     showError: true,
    //                     massageFromServer: '',
    //                 });
    //             } else if(response.data === 'recovery email sent') {
    //                 this.setState({
    //                     showError: false,
    //                     messageFromServer: 'recovery email sent',
    //                 });
    //             }
    //         })
    //         .catch(error => {
    //             console.log('error', error.data);                
    //         })
    //   }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.sendEmail}>
          <h1>Enter Email</h1>
          {JSON.stringify(this.props.user)}
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
