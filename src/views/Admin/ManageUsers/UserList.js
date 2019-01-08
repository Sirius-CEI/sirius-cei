import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { ListItem, ListItemText } from '@material-ui/core';
import RegisterButton from './RegisterButton';

const styles = theme => ({
  root: {
    flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
});

class UserList extends Component {
	componentDidMount() {
		this.props.dispatch({
			type: 'FETCH_USER_LIST'
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