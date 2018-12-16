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

class Form extends Component {

    state = {
        newRelease: {
            year: '',
            graph: '',
            header: '',
            description: '',
        }
    }

    // handle changes in the form inputs
    handleChange = event => {
        console.log('handleChange', event.target.value)
        this.setState({
            newRelease: {
                ...this.state.newRelease,
                [event.target.name]: event.target.value,
            }
        });
    }

    // submit Release information from form
    onSubmit = event => {
        console.log('Form adding: ', this.state);
        event.preventDefault();
        // this.props.dispatch({ type: 'ADD_RELEASE', payload: this.state.newRelease })
        this.setState({
            newRelease: {
                year: '',
                graphs: '',
                header: '',
                description: '',
            }
        });
    }

    // handle open of drop down menu
    handleOpen = () => {
        this.setState({ open: true });
      };
    
    // handle close of drop down menu
    handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const newRelease = this.state.newRelease;
    return (
        <div className={classes.div} id="form">
                <form className={classes.form} id="formInputs" onSubmit={this.onSubmit}>
                    <FormControl id="formMenu">
                    <TextField id="year" type='number' label="year" name="year" margin="normal" variant="outlined"
                        value={newRelease.year} onChange={this.handleChange} />
                        <Select
                            variant="outlined"
                            label="Graph"
                            placeholder="None"
                            open={this.state.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={newRelease.graph}
                            onChange={this.handleChange}
                            name="graph"
                            input={
                                <OutlinedInput
                                  labelWidth={0}
                                  name="graph"
                                  id="graph-select"
                                  label="graph"
                                  placeholder="graph"
                                />
                              }
                        >
                               <MenuItem value=''>
                               <em>None</em>
                               </MenuItem>
                                <MenuItem value={1}>Wages</MenuItem> 
                                <MenuItem value={2}>Employment</MenuItem> 
                                <MenuItem value={3}>Entrepreneurship</MenuItem> 
                                <MenuItem value={4}>Business Growth</MenuItem> 
                                <MenuItem value={5}>Access to Capital</MenuItem> 
                                <MenuItem value={6}>Regional Investment</MenuItem>
                                <MenuItem value={7}>Job Quality</MenuItem> 
                                <MenuItem value={8}>Workforce Development</MenuItem> 
                                <MenuItem value={9}>Two-year College Graduation + Transfer Rates</MenuItem> 
                                <MenuItem value={10}>Four-year College Graduation + Transfer Rates</MenuItem> 
                                <MenuItem value={11}>Transit</MenuItem> 
                                <MenuItem value={12}>Home Ownership</MenuItem> 
                                <MenuItem value={13}>Lending</MenuItem>  
                                <MenuItem value={14}>Renting</MenuItem>  
                            </Select>
                    <TextField id="graph_header" type='text' label="header" name="header" margin="normal" variant="outlined"
                        value={newRelease.header} onChange={this.handleChange} />
                    <TextField 
                        id="graph_description" 
                        multiline
                        rowsMax="40"
                        className={classes.description} 
                        type='url' label="description" 
                        name="description" 
                        margin="normal" 
                        variant="outlined"
                        value={newRelease.description} 
                        onChange={this.handleChange} 
                    />
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

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default compose(
    connect(mapReduxStateToProps),
    withStyles(styles)
)(Form);