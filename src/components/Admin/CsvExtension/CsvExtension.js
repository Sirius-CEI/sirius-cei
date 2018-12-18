import React, { Component } from 'react';
import ViewLatestCsv from './ViewLatestCsv';
import CsvConversion from './CsvConversion';

class CsvExtension extends Component {

    addCsv = ()=> {
        console.log('add csv');
    }

    render() {
        return (
            <div>
                <CsvConversion />
                <br></br>
                <ViewLatestCsv />
            </div>
        );
    }
}

export default CsvExtension;
