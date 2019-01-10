import React, { Component } from 'react';
import ViewLatestCsv from './ViewLatestCsv';
import CsvConversion from './CsvConversion';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    csvExtension: {
        padding: '5px'
    }
  });
class CsvExtension extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.csvExtension}>
                <CsvConversion />
                <br></br>
                <ViewLatestCsv />
            </div>
        );
    }
}

CsvExtension.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(CsvExtension);