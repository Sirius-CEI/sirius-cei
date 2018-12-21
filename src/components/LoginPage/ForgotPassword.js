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
      if(this.state.username === '') {
          this.setState({
              showError: false,
              messageFromServer: '',
          });
      } else {
          axios
            .post('http://localhost:3000/#/forgot-password', {
                username: this.state.username,
            })
            .then(response => {
                console.log('response data', response.data);
                if(response.data === 'email not in db') {
                    this.setState({
                        showError: true,
                        massageFromServer: '',
                    });
                } else if(response.data === 'recovery email sent') {
                    this.setState({
                        showError: false,
                        messageFromServer: 'recovery email sent',
                    });
                }
            })
            .catch(error => {
                console.log('error', error.data);                
            })
      }
  }

  render() {
    return (
      <div>
          <h1>Forgot Password Page</h1> 
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
              value="Log In"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(ForgotPassword);
