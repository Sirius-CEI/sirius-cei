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
    username: this.props.user.username,
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
    // this.props.dispatch({ type: 'EDIT_PASSWORD', payload: this.state })
    this.setState({
        username: this.props.user.username,
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
  user: reduxState.user,
});

export default compose(
    connect(mapReduxStateToProps),
    withStyles(styles)
)(PasswordExtension);
