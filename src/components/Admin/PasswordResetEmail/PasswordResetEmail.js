import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

class PasswordResetEmail extends Component {


    onSubmit = () => {
        console.log('Sending Pass Reset Email');
        this.props.dispatch({ type: 'SEND_EMAIL'})
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Button onClick={this.onSubmit}>
            Send Password Reset Email
            </Button>
        </div>
        );
    }
}




const mapReduxStateToProps = reduxState => ({
    reduxState
  });
  
  export default compose(
      connect(mapReduxStateToProps),
  )(PasswordResetEmail);