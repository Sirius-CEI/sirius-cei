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

class UsernameExtension extends Component {

state = {
    username: '',
    newUsername: '',
    password: '',
}

// handle changes in the form inputs
handleChange = event => {
    console.log('handleChange', event.target.value)
    this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    });
}

// submit project information from form
onSubmit = event => {
    console.log('Changing Password to: ', this.state);
    event.preventDefault();
    this.props.dispatch({ type: 'UPDATE_USERNAME', payload: this.state })
    this.setState({
        username: '',
        newUsername: '',
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
                        label="enter current email" 
                        name="username" 
                        margin="normal" 
                        variant="outlined"
                        value={this.state.username} 
                        onChange={this.handleChange} 
                    />
                    <TextField 
                        id="edit_password" 
                        type='text' 
                        label="enter new email" 
                        name="newUsername" 
                        margin="normal" 
                        variant="outlined"
                        value={this.state.newUsername} 
                        onChange={this.handleChange} 
                    />
                </FormControl>
                <Button type='submit' variant="outlined" color="primary">
                    Save Email Address
                </Button>
            </form>
        </div>
    );
  }
}

UsernameExtension.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  user: reduxState.users,
});

export default compose(
    connect(mapReduxStateToProps),
    withStyles(styles)
)(UsernameExtension);
