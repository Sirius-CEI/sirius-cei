import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import uuidv1 from 'uuid/v1';

const styles = theme => ({
	root: {
		padding: theme.spacing.unit
	},
	cssClass: {
		flexGrow: 1
	},
	input: {
		display: 'flex',
		fontFamily: 'Lato',
		fontSize: '1rem',
		paddingBottom: theme.spacing.unit
	}
});

class CsvConversion extends Component {

	state = {
		data: [],
		errors: [],
		filename: 'No file chosen',
	}

   // handle changes in the form inputs
	handleChange = (data, filename) => {
		// console.log(event.target.files[0]);
		this.setState({
				...this.state,
				data: data,
				filename: filename,
		});
	}

	handleErrors = error => {
		alert('Error converting file')
		console.log(`Error converting file`, error);
	}

	// submit csv information
	handleSubmit = event => {
		const { data, filename } = this.state;
		const { userId } = this.props;
		const fileInfo = {
			user_id: userId,
			filename: filename,
			uuid: uuidv1(),
		}
		// console.log('Adding CSV: ', this.state);
		event.preventDefault();
		this.props.dispatch({ type: 'ADD_CSV_DATA', payload: data, fileInfo: fileInfo })
		this.setState({
			data: [],
			errors: [],
			filename: 'No file chosen',
		});
	}

	render() {
		const { classes } = this.props;
		const { filename } = this.state;
		return (
			<div className={classes.root}>
				<Typography variant="h4" gutterBottom>Select CSV File</Typography>
				<form onSubmit={this.handleSubmit}>
					<CSVReader
						cssClass={classes.cssClass}
						cssInputClass={classes.input}
						parserOptions={ {header: true} }
						onFileLoaded={this.handleChange}
						onError={this.handleErrors}
						inputId="csvFile"
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={filename === 'No file chosen'}
					>
						Submit CSV
					</Button>
				</form>
			</div>
		);
	}
}

CsvConversion.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user }) => ({ userId: user._id})

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(CsvConversion);