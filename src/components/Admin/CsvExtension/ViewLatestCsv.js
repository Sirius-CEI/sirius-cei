import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';


class ViewLatestCsv extends Component {

    deleteCard = (id) => {
        console.log('Delete CSV id: ', id);
        this.props.dispatch( { type: 'DELETE_CSV', payload: id } );
    }

    render() {
        return (
            <div>
                <p>Latest CSV</p>
                    <div>
                        {this.props.csv.map( (csv, index) => {
                        return (
                        <div key={index}>
                            <Card className="project-content" id="display">
                                <CardContent>
                                    <h2>{csv.data}</h2>
                                </CardContent>
                            </Card>                       
                            <Button onClick={() => this.deleteCard(csv._id)}>Delete</Button>
                        </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    csv: reduxState.csv,
  });
  
  export default connect(mapReduxStateToProps)(ViewLatestCsv);
