import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxList extends Component {
  state = {
		username: '',
		password: '',
	};

	handleEdit = event => {
		const { user } = this.props
		this.setState({
			username: user.username,
			password: user.password,
		})
	}

	handleChange = event => {
		event.preventDefault();
		this.setState({
			...this.state,
			[event.target.name]: [event.target.value]
		})
	}
	
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
				
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
	user: user
})

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);