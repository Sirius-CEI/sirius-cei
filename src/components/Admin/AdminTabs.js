import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import adminPages from './adminPages';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class AdminTabs extends Component {
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
        <AppBar position="static">
          <Tabs centered value={value} onChange={this.handleChange}>
            {adminPages.map((item, index) => (
							<Tab key={index} label={item.tabText} icon={<FontAwesomeIcon icon={item.icon} size="lg" />} />
						))}
          </Tabs>
        </AppBar>
				{adminPages.map((item, index) => (
					value === index && item.component
				))}
      </div>
    );
  }
}

AdminTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTabs);