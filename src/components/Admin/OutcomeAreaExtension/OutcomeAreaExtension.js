import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	root: {
			flexGrow: 1,
	},
	form: {
		flexGrow: 1,
	}
  });

class AnnualReleaseExtension extends Component {

	state = {
		outcomeAreaList: [],
		outcomeArea: {
			title: '',
			copy: '',
			notes: '',
		}
	}
	
	// handle open of drop down menu
	handleOpen = () => {
		this.setState({ open: true });
	};
	
	// handle close of drop down menu
	handleClose = () => {
		this.setState({ open: false });
	};

	getOutcomeAreas = () => {
		console.log(`in getOutcomeAreas`);
		this.props.dispatch({
			type: 'GET_OUTCOME_AREAS'
		})
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

	componentDidMount() {
		this.getOutcomeAreas();
	}

  render() {
		const { classes } = this.props;
		const { outcomeArea } = this.state;
		return (
			<div className={classes.root} id="root">
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
			</div>
		);
  }
}

AnnualReleaseExtension.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(AnnualReleaseExtension);