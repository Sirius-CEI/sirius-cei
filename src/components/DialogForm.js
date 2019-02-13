import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText
} from '@material-ui/core';

const DialogForm = ({
	open = false,
	dialogTitle = 'Form',
	dialogDescription = '',
	formId = 'dialog-form',
	formFields = <Fragment />,
	onSubmit = () => {},
	handleClose = () => {},
	...otherProps
}) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			aria-describedby="form-dialog-description"
		>
			<form id={formId} onSubmit={onSubmit}>
				<DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
					<DialogContent>
						{!dialogDescription ? null :
							<DialogContentText  id="form-dialog-description">
								{dialogDescription}
							</DialogContentText>
						}
						{formFields}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							type="submit"
							color="primary"
						>
							Submit
						</Button>
					</DialogActions>
				</form>
			</Dialog>
	)
}

export default DialogForm;