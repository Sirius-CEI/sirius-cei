import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fab from '@material-ui/core/Fab';

import DialogForm from '../../../components/DialogForm';
import IndicatorFields from './Indicator.fields';

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

class EditIndicator extends Component {

	state = {
		open: false,
		indicator: {
			outcomeId: '',
			_id: '',
			title: '',
			copy: '',
			notes: '',
			active: false,
			order: 100,
		}
	};

	handleOpen = () => {
		this.setState({
			...this.state,
			open: true
		});
	};
	
	handleClose = () => {
		this.setState({
			...this.state,
			open: false 
		});  
	};

	onSubmit = () => {

	}

	render() {
		const { outcomes, indicator } = this.props;
		const { open } = this.state;
		return (
			<Fragment>
				<Fab size="medium" onClick={this.handleOpen}>
					<FontAwesomeIcon icon="edit" />
				</Fab>
				<DialogForm
					open={open}
					dialogTitle={'Edit Indicator'}
					formId={'edit-indicator'}
					formFields={
						<IndicatorFields
							handleChange={this.handleChange}
							outcomes={outcomes}
							indicator={indicator}
							editMode={true}
						/>
					}
					onSubmit={this.onSubmit}
					handleClose={this.handleClose}
				/>
			</Fragment>
		);
	}
}

EditIndicator.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
	outcomes: reduxState.outcomes,
	indicator: reduxState.indicator
});

export default compose(
	connect(mapReduxStateToProps),
	withStyles(styles)
)(EditIndicator);