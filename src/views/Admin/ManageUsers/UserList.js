import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import RegisterButton from './RegisterButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Block from '@material-ui/icons/Block';
import Swal from 'sweetalert2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  root: {
	width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
	},
	reactivateBtn: {
		margin: theme.spacing.unit,
		backgroundColor:'#02c39a',
			'&:hover': {
				backgroundColor: '#009B78'
			},
		color: 'white',
	},
	deactivateBtn: {
		margin: theme.spacing.unit,
		backgroundColor:'#ffc100',
			'&:hover': {
				backgroundColor: '#C69500'
			},
		color: 'white',
	},
	delBtn: {
		margin: theme.spacing.unit,
		backgroundColor:'#d0021b',
			'&:hover': {
				backgroundColor: '#A90014'
			},
		color: 'white',
	},
});

class UserList extends Component {
	componentDidMount() {
		this.props.dispatch( { type: 'GET_DATA', main: 'FETCH_USER_LIST'} )
	}

	//deactivate user
	deactivateUser = (id) => {
		console.log('deactivate user', id);
		this.props.dispatch( { type: 'DEACTIVATE_USER', payload: id } );
	}

	//reactivate user
	reactivateUser = (id) => {
		console.log('reactivate user', id);
		this.props.dispatch( { type: 'REACTIVATE_USER', payload: id } );
	}

	//delete user
	deleteUser = (id) => {
		console.log('delete user id', id);
		Swal({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				this.props.dispatch( { type: 'DELETE_USER', payload: id } );
				Swal(
					'Deleted!',
					'User has been deleted.',
					'success'
				)
			}
		})
	}

  render() {
    const { classes, users } = this.props;

    return (
			<div className={classes.root}>
				<RegisterButton />
					<Table className={classes.table}>
						<TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Reactivate</TableCell>
                <TableCell align="right">Deactivate</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
						</TableHead>
						<TableBody>
						{users.map((item, index) => {
							return (
							<TableRow key={index}>
								<TableCell component="th" scope="row">
								{item.username}
								</TableCell>
								<TableCell align="right">
									{item.active.toString()}
								</TableCell>
								<TableCell align="right">
                  <Fab
                    size="small" 
										className={classes.reactivateBtn}
										onClick={()=> this.reactivateUser(item._id)}>
										<PowerSettingsNew/>
									</Fab>
								</TableCell>
								<TableCell align="right">
                  <Fab 
                    size="small" 
										className={classes.deactivateBtn}
										onClick={()=> this.deactivateUser(item._id)}>
										<Block/>
									</Fab>
								</TableCell>
								<TableCell align="right">
                  <Fab  
                    size="small" 
										className={classes.delBtn}
										onClick={()=> this.deleteUser(item._id)}>
										<DeleteIcon className={classes.rightIcon}/>
									</Fab>
								</TableCell>
							</TableRow>
							);
						})}
						</TableBody>
					</Table>
			</div>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
	users: state.users
})

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(UserList);