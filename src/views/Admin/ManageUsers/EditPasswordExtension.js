import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
    div: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    form: {
        display: 'inline-block',
        maxHeight: '400px',
        maxWidth: '600px',
        width: 'auto',
        height: 'auto',
        backgroundColor: 'white',
    },
});

class PasswordExtension extends Component {

state = {
    username: '',
    password: '',
}

// handle changes in the form inputs
handleChange = event => {
    this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    });
}

// submit changed information from form
onSubmit = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'RESET_PASSWORD', payload: this.state })
    this.setState({
        username: '',
        password: '',
    });
}

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.div} id="form">
            <form className={classes.form} id="formInputs" onSubmit={this.onSubmit}>
                <FormControl id="formMenu">
                    <TextField 
                        id="username" 
                        type='text' 
                        label="enter email" 
                        name="username" 
                        margin="normal" 
                        variant="outlined"
                        value={this.state.username} 
                        onChange={this.handleChange} 
                    />
                    <TextField 
                        id="edit_password" 
                        type='text' 
                        label="change password" 
                        name="password" 
                        margin="normal" 
                        variant="outlined"
                        value={this.state.password} 
                        onChange={this.handleChange} 
                    />
                </FormControl>
                <Button type='submit' variant="outlined" color="primary">
                    Save Password
                </Button>
            </form>
        </div>
    );
  }
}

PasswordExtension.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  user: reduxState.users,
});

export default compose(
    connect(mapReduxStateToProps),
    withStyles(styles)
)(PasswordExtension);
