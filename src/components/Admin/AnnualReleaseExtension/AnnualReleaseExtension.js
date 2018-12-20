import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
	root: {
			flexGrow: 1,
		}
  });

class AnnualReleaseExtension extends Component {

	state = {
		outcomeArea: {
			title: '',
			copy: '',
			notes: '',
			indicators: [],
		}
	}

	// handle changes in the form inputs
	handleChange = event => {
		console.log('handleChange', event.target.value)
		this.setState({
			outcomeArea: {
				...this.state.outcomeArea,
				[event.target.name]: event.target.value,
			}
		});
	}

	// handle open of drop down menu
	handleOpen = () => {
		this.setState({ open: true });
	  };
	
	// handle close of drop down menu
	handleClose = () => {
		this.setState({ open: false });
	};
	
	handleSubmit = event => {
		event.preventDefault();
		const { outcomeArea } = this.state
		console.log(outcomeArea);
		axios.post('/api/outcome-areas', {payload: outcomeArea})
			.then((response) => console.log(response))
			.catch((err) => console.log(err));
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
							margin="normal"
							variant="outlined"
							fullWidth
							value={outcomeArea.title}
							onChange={this.handleChange}
						/>
						<TextField
							label="Copy text"
							type="text"
							name="copy"
							margin="normal"
							variant="outlined"
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