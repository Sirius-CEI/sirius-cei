import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const IndicatorFields = ({ outcomes, handleChange, indicator, editMode }) => (
	<Fragment>
		<TextField
			label="Outcome area"
			name="outcomeId"
			select
			margin="dense"
			fullWidth
			autoFocus
			disabled={editMode}
			value={indicator.outcomeId}
			onChange={handleChange}
		>
			{outcomes.map((item) => (
				<MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
			))}
		</TextField>
		<TextField
			label="Indicator title"
			name="title"
			type="text"
			margin="dense"
			fullWidth
			value={indicator.title}
			onChange={handleChange}
		/>
		<TextField
			label="Copy"
			name="copy"
			type="text"
			margin="dense"
			fullWidth
			multiline
			value={indicator.copy}
			onChange={handleChange}
		/>
		<TextField
			label="Notes"
			name="notes"
			type="text"
			margin="dense"
			fullWidth
			multiline
			value={indicator.notes}
			onChange={handleChange}
		/>
	</Fragment>
)

export default IndicatorFields