import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const LogoutButton = props => (
  <Button
    onClick={props.dispatch({ type: 'LOGOUT'})}
  >
    Log Out
  </Button>
);

export default connect()(LogoutButton);
