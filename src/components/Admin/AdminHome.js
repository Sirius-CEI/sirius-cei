import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutcomeAreaExtension from './OutcomeAreaExtension/OutcomeAreaExtension';
import CsvExtension from './CsvExtension/CsvExtension';
import CardExtension from './CardExtension/CardExtension';
import EditPasswordExtension from './EditPasswordExtension/EditPasswordExtension';
import AdminTabs from './AdminTabs';

const styles = theme => ({
  root: {
    flexGrow: 1,
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

    return (
      <div className={classes.root}>
				<AdminTabs />
      </div>
    );
  }
}

AdminHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminHome);