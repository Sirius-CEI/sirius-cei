import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    recentCsv: {
        maxHeight: '100px',
        maxWidth: '100px',
        height: 'auto',
        width: 'auto',
    }
  });
class ViewLatestCsv extends Component {

    deleteCard = (id) => {
        console.log('Delete CSV id: ', id);
        this.props.dispatch( { type: 'DELETE_CSV', payload: id } );
    }

    componentDidMount() {
        this.props.dispatch( { type: 'FETCH_CSV' } );
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h3>Latest CSV</h3>
                <div>
                    {this.props.csv.map( (csv, index) => {
                        return (
                        <div key={index}>
                        <Card className={classes.recentCsv} id="display">
                            <CardContent>
                                <h2>CSV here</h2>
                            </CardContent>
                        </Card>                       
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className={classes.button}
                            onClick={() => this.deleteCard(csv._id)}
                        >
                            Delete
                        </Button>
                        </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

ViewLatestCsv.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
    csv: reduxState.csv
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(ViewLatestCsv);
