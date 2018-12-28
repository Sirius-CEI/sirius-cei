import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import manageUsers from './manageUsers';

const styles = theme => ({
  root: {
    flexGrow: 1,
	},
	grow: {
		flexGrow: 1
	},
  heading: {
		color: theme.palette.text.primary,
		flexGrow: 1,
		flexShrink: 0,
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
});

class ManageUsers extends React.Component {
  state = {
    expanded: null,
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
				{manageUsers.map((item, index) => (
					<ExpansionPanel key={index} expanded={expanded === index} onChange={this.handleChange(index)}>
						<ExpansionPanelSummary className={classes.summary} expandIcon={<FontAwesomeIcon icon='chevron-down' size='sm' />}>
							<Grid container spacing={8} direction="row" justify="flex-start" alignItems="center">
								<Grid item>
									<Typography variant="body1" className={classes.secondaryHeading}>
										<FontAwesomeIcon icon={item.icon} size='lg' fixedWidth />
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="body1" className={classes.heading}>{item.title}</Typography>
								</Grid>
								<Grid item>
									<Typography variant="body1" className={classes.secondaryHeading}>{item.subTitle}</Typography>
								</Grid>
							</Grid>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							{item.component}
						</ExpansionPanelDetails>
					</ExpansionPanel>
				))}
      </div>
    );
  }
}

ManageUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageUsers);