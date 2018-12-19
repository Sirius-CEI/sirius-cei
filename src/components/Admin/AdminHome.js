import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExtensionPanels from './ExtensionPanels/ExtensionPanels';
import LogOutButton from '../LogOutButton/LogOutButton';

const styles = theme => ({
  extensionPanels: {
    margin: '5px',
  },
});

class AdminHome extends Component {
  render() {
      const { classes } = this.props;   
      return (
        <div>
          <h1 className={classes.h1} id="welcome">
            Welcome, { this.props.user.username }
          </h1>
          <LogOutButton />
          <div className={classes.extensionPanels}>
            <ExtensionPanels />
          </div>
        </div>
      );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});


AdminHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(AdminHome);