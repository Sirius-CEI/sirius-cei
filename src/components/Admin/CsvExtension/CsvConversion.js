import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class CsvConversion extends Component {

    render() {
        return (
            <div>
                {JSON.stringify('hi')}
                <Button id="submitCsv">
                <input 
                    id="myFile" 
                    type="file" 
                    onChange={this.addCsv}
                    accept=".csv" 
                />
                </Button>
                <br></br>
            </div>
        );
    }
}

export default CsvConversion;
