import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';
import CSVReader from 'react-csv-reader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import ViewLatestCsv from './ViewLatestCsv';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class CsvConversion extends Component {

    state = {
        csv: '',
    }

   // handle changes in the form inputs
    handleChange = event => {
        console.log('handleChange', event)
        this.setState({
                ...this.state,
                csv: event,
        });
    }

    // submit csv information
    handleSubmit = (event) => {
        console.log('Adding CSV: ', this.state);
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_CSV_DATA', payload: this.state })
        this.setState({
            csv: '',
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="container">
                <h3>Select CSV File</h3>
                <form onSubmit={this.handleSubmit}>
                    <CSVReader
                    cssClass="react-csv-input"
                    onFileLoaded={this.handleChange}
                    />
                    <br></br>
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                    >
                        Submit CSV
                    </Button>
                </form>
            </div>
        );
    }
}

CsvConversion.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(CsvConversion);