import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class CsvConversion extends Component {

    state = {
        csv: '',
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
    addCsv = event => {
        console.log('Adding CSV: ', this.state);
        event.preventDefault();
        // this.props.dispatch({ type: 'ADD_CSV', payload: this.state })
        this.setState({
            csv: '',
        });
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state)}
                <form onSubmit={this.addCsv}>
                    <input 
                        id="myFile" 
                        type="file" 
                        // accept=".csv" 
                        value={this.state.csv} 
                        name="csv"
                        onChange={this.handleChange} 
                    />
                    <Button id="submitCsv" type="submit" variant="outlined" color="primary">
                        Add CSV
                    </Button>
                </form>
                <img src={this.state.csv} alt="info-here" />
            </div>
        );
    }
}

export default CsvConversion;
