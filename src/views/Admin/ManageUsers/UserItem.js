import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import RegisterButton from './RegisterButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';

import {
	Checkbox,
	Fab,
	TableCell,
	TableRow
} from '@material-ui/core'
import { green } from '@material-ui/core/colors';

import { apiAction } from '../../../redux/actions'

const styles = theme => ({
	delete: {
		backgroundColor: theme.palette.danger,
		color: 'white'
	},
	root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
	checked: {},
	swal: {
		zIndex: theme.zIndex.modal,
	},
})

const deleteUser = ({item, apiAction, classes}, e) => {
	Swal({
		title: 'Are you sure?',
		text: "You won't be able to revert this action!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Yes',
		customContainerClass: classes.swal
	})
	.then(result => {
		console.log(result);
		if (result.value) {
			apiAction({
				baseUrl: '/api/users',
				id: item._id,
				method: "DELETE",
				label: 'USERS'
			});
			Swal(
				'Deleted!',
				'User has been deleted.',
				'success'
			)
		}
	})
	
}

const toggleActive = ({item, apiAction}, e) => {
	apiAction({
		baseUrl: '/api/users',
		id: item._id,
		data: { active: !item.active },
		method: "PUT",
		label: 'USERS'
	})
}

const UserItem = props => {
	const { classes, item } = props;
	return (
		<TableRow>
			<TableCell component="th" scope="row">
				{item.username}
			</TableCell>
			<TableCell align="center">
				<Checkbox
					checked={item.active}
					onClick={(e)=>toggleActive(props, e)}
					classes={{
						root: classes.root,
						checked: classes.checked
					}}
					disabled={item.username === 'admin@cei.org'}
				/>
			</TableCell>
			<TableCell align="center">
				<Fab  
					size="small"
					className={classes.delete}
					onClick={(e)=>deleteUser(props, e)}
					disabled={item.username === 'admin@cei.org'}
				>
					<DeleteIcon />
				</Fab>
			</TableCell>
		</TableRow>
	)
}

UserItem.propTypes = {
	classes: PropTypes.object.isRequired,
	apiAction: PropTypes.func.isRequired,
};

export default compose(
	connect(null, { apiAction }),
	withStyles(styles)
)(UserItem);