// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
// import { connect } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Button from '@material-ui/core/Button';

// const styles = theme => ({
//   root: {
// 		flexGrow: 1,
// 	},
// 	grow: {
// 		flexGrow: 1,
// 	},
// 	rightIcon: {
// 		marginLeft: theme.spacing.unit,
// 	},
// });

// const logout = (dispatch, history) => {
// 	dispatch({type:'LOGOUT'})
// 	history.push("/");
// }

// const LogoutButton = ({ classes, dispatch, history }) => (
//   <Button variant="outlined" onClick={()=>logout(dispatch, history)} >
//     Log Out
// 		<FontAwesomeIcon icon="sign-out-alt" className={classes.rightIcon} />
//   </Button>
// );

// LogoutButton.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default compose(
// 	withRouter,
// 	connect(),
// 	withStyles(styles),
// )(LogoutButton)

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
});

class LogoutButton extends Component {

	logout = (dispatch, history) => {
		dispatch({type:'LOGOUT'})
		history.push("/");
	}

	componentDidMount() {
		this.props.history.push('/admin');
	}
 
	render() {
		const { classes, dispatch, history, logout } = this.props;
		return (
			<Button variant="outlined" onClick={()=>logout(dispatch, history)} >
				Log Out
				<FontAwesomeIcon icon="sign-out-alt" className={classes.rightIcon} />
			</Button>
		)
	}
};

LogoutButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	outcomeAreas: state.outcomes,
	user: state.user,
})

export default compose(
	withRouter,
	connect(mapStateToProps),
	withStyles(styles),
)(LogoutButton)
