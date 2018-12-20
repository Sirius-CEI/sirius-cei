import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CSVReader from 'react-csv-reader'

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

    // submit project information from form
    handleSubmit = event => {
        console.log('Adding CSV: ', this.state);
        event.preventDefault();
        // this.props.dispatch({ type: 'ADD_CSV_DATA', payload: this.state })
        this.setState({
            csv: '',
        });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <CSVReader
                    cssClass="react-csv-input"
                    label="Select CSV file to upload"
                    onFileLoaded={this.handleChange}
                    />
                    <br></br>
                    <Button type="submit">Submit CSV</Button>
                </form>
            </div>
        );
    }
}

export default CsvConversion;
