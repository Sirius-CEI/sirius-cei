import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

class EditCard extends Component {

state = {
    newCard: {
        id: this.props.cardId,
        title: '',
        image: '',
        url: '',
        category_id: '',
    }
}

// handle changes in the form inputs
handleChange = event => {
    console.log('handleChange', event.target.value)
    this.setState({
        newCard: {
            ...this.state.newCard,
            [event.target.name]: event.target.value,
        }
    });
}

// submit project information from form
onSubmit = event => {
    console.log('Form adding: ', this.state);
    event.preventDefault();
    this.props.handleClose();
    this.props.dispatch({ type: 'EDIT_CARD', payload: this.state.newCard })
    this.setState({
        newCard: {
            title: '',
            image: '',
            url: '',
            category_id: '',
        }
    });
}

  render() {
    const { classes } = this.props;
    const newCard = this.state.newCard;
    return (
        <div className={classes.div} id="form">
            <form className={classes.form} id="formInputs" onSubmit={this.onSubmit}>
                <FormControl id="formMenu">
                <TextField 
                    id="card-title" 
                    type='text' 
                    label="title" 
                    name="title" 
                    margin="normal" 
                    variant="outlined"
                    value={newCard.title} 
                    onChange={this.handleChange} 
                />
                <TextField 
                    id="card-image" 
                    type='text' 
                    label="image" 
                    name="image" 
                    margin="normal" 
                    variant="outlined"
                    value={newCard.image} 
                    onChange={this.handleChange} 
                />
                <TextField 
                    id="card-url" 
                    className={classes.description} 
                    type='url' label="url" 
                    name="url" 
                    margin="normal" 
                    variant="outlined"
                    value={newCard.url} 
                    onChange={this.handleChange} 
                />
                <Select
                    variant="outlined"
                    label="Category"
                    placeholder="None"
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={newCard.category_id}
                    onChange={this.handleChange}
                    name="category_id"
                    input={
                        <OutlinedInput
                            labelWidth={0}
                            name="category_id"
                            id="category-select"
                            label="category"
                            placeholder="category"
                        />
                    }
                >
                    <MenuItem value=''>
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Macro View</MenuItem> 
                    <MenuItem value={2}>Economic Development</MenuItem> 
                    <MenuItem value={3}>Human Capital</MenuItem>
                    <MenuItem value={4}>Access and Transit</MenuItem>
                </Select>
                </FormControl>
                <br></br>
                <br></br>
                <Button type='submit' variant="outlined" color="primary">
                    Add Release
                </Button>
            </form>
        </div>
    );
  }
}

EditCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  cards: reduxState.cards,
});

export default compose(
    connect(mapReduxStateToProps),
    withStyles(styles)
)(EditCard);