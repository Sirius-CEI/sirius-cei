import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import RegisterButton from './RegisterButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@material-ui/core'

import { apiAction, apiGet } from '../../../redux/actions';
import UserItem from './UserItem';

const styles = theme => ({
  root: {
		width: '100%',
	},
});

class UserList extends Component {
  render() {
    const { classes, users } = this.props;

    return (
			<div className={classes.root}>
				<RegisterButton />
					<Table className={classes.table}>
						<TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
						</TableHead>
						<TableBody>
							{users.length >0 && users.map((item, index) => (<UserItem item={item} key={index} />))}
						</TableBody>
					</Table>
			</div>
    );
  }
}

UserList.propTypes = {
	classes: PropTypes.object.isRequired,
	apiAction: PropTypes.func.isRequired,
	apiGet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.user,
	users: state.users
})

export default compose(
	connect(mapStateToProps, { apiAction, apiGet }),
	withStyles(styles)
)(UserList);