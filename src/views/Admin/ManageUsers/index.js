import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Grid,
	Typography
} from '@material-ui/core'

import manageUsers from './data';

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
    expanded: 0,
  };

  handleChange = () => {
    this.setState({
      expanded: this.state.expanded === 0 ? 1 : 0
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <Fragment>
				{manageUsers.map((item, index) => (
					<ExpansionPanel key={index} expanded={expanded === index} onChange={this.handleChange}>
						<ExpansionPanelSummary expandIcon={<FontAwesomeIcon icon='chevron-down' size='xs' />}>
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
      </Fragment>
    );
  }
}

ManageUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageUsers);