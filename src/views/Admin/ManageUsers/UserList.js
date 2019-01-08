import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { ListItem, ListItemText } from '@material-ui/core';
import RegisterButton from './RegisterButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Block from '@material-ui/icons/Block';
import Swal from 'sweetalert2';

const styles = theme => ({
  root: {
    flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	reactivateBtn: {
		margin: theme.spacing.unit,
		backgroundColor:'#4caf50',
			'&:hover': {
				backgroundColor: '#388e3c'
			},
		color: 'white',
	},
	deactivateBtn: {
		margin: theme.spacing.unit,
		backgroundColor:'#ffc107',
			'&:hover': {
				backgroundColor: '#ffa000'
			},
		color: 'white',
	},
	delBtn: {
		margin: theme.spacing.unit,
		backgroundColor:'#f44336',
			'&:hover': {
				backgroundColor: '#d32f2f'
			},
		color: 'white',
	},
	rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class UserList extends Component {
	componentDidMount() {
		this.props.dispatch( { type: 'FETCH_USER_LIST'} )
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
				<List>
					{users.map((item, index) => (
						<ListItem key={index}>
							<ListItemText primary={item.username} />
							<Button 
								variant="contained"  
								className={classes.reactivateBtn}
								onClick={this.delete}>
								Re-activate
								<PowerSettingsNew className={classes.rightIcon} />
							</Button>
							<Button 
								variant="contained"  
								className={classes.deactivateBtn}
								onClick={this.deactivate}>
								De-activate
								<Block className={classes.rightIcon} />
							</Button>
							<Button 
								variant="contained"  
								className={classes.delBtn}
								onClick={()=> this.deleteUser(item._id)}>
								Delete
								<DeleteIcon className={classes.rightIcon} />
							</Button>
						</ListItem>
					))}
				</List>
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