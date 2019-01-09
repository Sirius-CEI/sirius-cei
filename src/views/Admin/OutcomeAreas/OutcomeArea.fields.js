import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField'

const EditOnlyFields = ({ outcomeArea, handleChange }) => (
	<Fragment>
		<TextField
			label="Order"
			type="number"
			name="order"
			margin="dense"
			fullWidth
			value={outcomeArea.order}
			onChange={handleChange}
		/>
		<TextField
			label="Resource ID"
			type="text"
			name="route"
			margin="dense"
			fullWidth
			multiline
			value={outcomeArea.route}
			onChange={handleChange}
		/>
	</Fragment>
)

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
		{editMode ? <EditOnlyFields outcomeArea={outcomeArea} handleChange={handleChange} /> : null}
	</Fragment>
)

export default OutcomeAreaFields;
