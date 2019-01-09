import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField'

const OutcomeAreaFields = ({ outcomeArea, handleChange, editMode }) => (
	<Fragment>
		<TextField
			label="Title"
			type="text"
			name="title"
			margin="dense"
			fullWidth
			autoFocus
			value={outcomeArea.title}
			onChange={handleChange}
		/>
		<TextField
			label="Copy text"
			type="text"
			name="copy"
			margin="dense"
			fullWidth
			multiline
			value={outcomeArea.copy}
			onChange={handleChange}
		/>
		<TextField
			label="Notes"
			type="text"
			name="notes"
			margin="dense"
			fullWidth
			multiline
			value={outcomeArea.notes}
			onChange={handleChange}
		/>
	</Fragment>
)

export default OutcomeAreaFields;
