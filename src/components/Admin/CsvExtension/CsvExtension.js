import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ViewLatestCsv from './ViewLatestCsv';

class CsvExtension extends Component {

    addCsv = ()=> {
        console.log('add csv');
    }

    render() {
        return (
            <div onload="addCsv()">
                <Button id="submitCsv">
                <input 
                    id="myFile" 
                    type="file" 
                    onchange={this.addCsv}
                    accept=".csv" 
                />
                </Button>
                <br></br>
                <ViewLatestCsv />
            </div>
        );
    }
}

export default CsvExtension;
