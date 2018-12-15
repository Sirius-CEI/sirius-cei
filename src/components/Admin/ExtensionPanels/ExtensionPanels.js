import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import AnnualReleaseExtension from '../AnnualReleaseExtension/AnnualReleaseExtension';
import CardExtension from '../CardExtension/CardExtension';
import CsvExtension from '../CsvExtension/CsvExtension';
import EditPasswordExtension from '../EditPasswordExtension/EditPasswordExtension';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: 'oswald',
    padding: '5px',
    margin: '5px',
  },
});


class ExtensionPanels extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>CSV File Upload/Delete</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {/* <CsvExtension /> */}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Create New Annual Release</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {/* <AnnualReleaseExtension /> */}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Cards</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {/* <CardExtension /> */}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Edit Password</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {/* <EditPasswordExtension /> */}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
        );
    }
}

ExtensionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default compose(
    connect(mapReduxStateToProps),
    withStyles(styles)
)(ExtensionPanels);

