import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LogoutButton from '../UI/LogoutButton';
import LoginModal from '../UI/LoginModal';
import OutcomeAreaExtension from './OutcomeAreaExtension/OutcomeAreaExtension';
import CsvExtension from './CsvExtension/CsvExtension';
import CardExtension from './CardExtension/CardExtension';
import EditPasswordExtension from './EditPasswordExtension/EditPasswordExtension';

const styles = theme => ({
  root: {
		flexGrow: 1,
		background: theme.palette.secondary.light,
		padding: theme.spacing.unit * 2,
  },
});

const panels = [
	{ title: 'Edit Outcome Areas and Indicators', component: <OutcomeAreaExtension /> },
	{ title: 'Update Chart Data', component: <CsvExtension /> },
	// { title: 'Manage What You Can Do Cards', component: <CardExtension /> },
	// { title: 'Manage Users', component: <EditPasswordExtension /> },
]

class AdminHome extends Component {
  state = {
		expanded: 0,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
		const { expanded } = this.state;
		// console.log(`AdminHome props`, this.props);
    return (
      <div className={classes.root}>
				
				{/* <LoginModal open={this.state.open} {...this.props} /> */}
				{panels.map((panel, index) => (
					<ExpansionPanel key={index} expanded={expanded === index} onChange={this.handleChange(index)}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant="h6">{panel.title}</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>{panel.component}</ExpansionPanelDetails>
					</ExpansionPanel>						
				))}
      </div>
    );
  }
}

AdminHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	user: state.user
})

export default compose(
	connect(mapStateToProps),
  withStyles(styles),
)(AdminHome);