import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
});

class AddOutcome extends Component {

	state = {
		outcomeArea: {
			title: '',
			copy: '',
			notes: '',
		},
	}

	// handle changes in the form inputs
	handleChange = event => {
		this.setState({
			outcomeArea: {
				...this.state.outcomeArea,
				[event.target.name]: event.target.value,
			}
		});
	}
	
	handleSubmit = event => {
		event.preventDefault();
		const { outcomeArea } = this.state
		this.props.dispatch({
			type: 'POST_OUTCOME_AREA',
			payload: outcomeArea
		})
		this.setState({
			outcomeArea: {
				title: '',
				copy: '',
				notes: '',
			}
		})
	}

  render() {
		const { classes } = this.props;
		const { outcomeArea } = this.state;
		return (
			<form className={classes.form} id="form" onSubmit={this.handleSubmit}>
					<TextField
						label="Title"
						type="text"
						name="title"
						fullWidth
						value={outcomeArea.title}
						onChange={this.handleChange}
					/>
					<TextField
						label="Copy text"
						type="text"
						name="copy"
						fullWidth
						value={outcomeArea.copy}
						onChange={this.handleChange}
					/>
					<Button	type="submit" variant="outlined" color="primary">Submit</Button>
				</form>
		);
  }
}

AddOutcome.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  outcomes: reduxState.outcomes
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(AddOutcome);