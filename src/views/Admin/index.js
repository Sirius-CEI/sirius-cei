import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import adminPages from '../../constants/adminPages'

const styles = theme => ({
  root: {
    flexGrow: 1,
	},
	container: {
		background: theme.palette.secondary.light,
		padding: theme.spacing.unit * 2
	},
	fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class AdminHome extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="sticky">
          <Tabs centered value={value} onChange={this.handleChange}>
            {adminPages.map((item, index) => (
							<Tab key={index} label={item.tabText} icon={<FontAwesomeIcon icon={item.icon} size="lg" />} />
						))}
          </Tabs>
        </AppBar>
				<Grid container className={classes.container}>
					{adminPages.map((item, index) => (
						<Grid item xs={12} key={index}>
							{value === index && item.component}
						</Grid>
					))}
				</Grid>
      </div>
    );
  }
}

AdminHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminHome);