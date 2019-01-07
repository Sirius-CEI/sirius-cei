import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const DialogForm = ({ open, dialogTitle, formId, formFields, onSubmit, handleClose }) => (
	<form id={formId} onSubmit={onSubmit}>
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
			<DialogContent>
				{formFields}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button type="submit" form={formId} color="primary">
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	</form>
)

export default DialogForm;