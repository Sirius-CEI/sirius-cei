import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import OutcomeAreaExtension from './OutcomeAreaExtension/OutcomeAreaExtension';
import CsvExtension from './CsvExtension/CsvExtension';
import CardExtension from './CardExtension/CardExtension';
import EditPasswordExtension from './EditPasswordExtension/EditPasswordExtension';
import PasswordResetEmail from './PasswordResetEmail/PasswordResetEmail';

const styles = theme => ({
  root: {
		flexGrow: 1,
		background: theme.palette.purple.light,
		padding: theme.spacing.unit * 2,
  },
});

const panels = [
	{ title: 'Edit Outcome Areas and Indicators', component: <OutcomeAreaExtension /> },
	{ title: 'Update Chart Data', component: <CsvExtension /> },
	{ title: 'Manage What You Can Do Cards', component: <CardExtension /> },
	{ title: 'Manage Users', component: <EditPasswordExtension /> },
]

class AdminHome extends React.Component {
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

    return (
      <div className={classes.root}>
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

export default withStyles(styles)(AdminHome);