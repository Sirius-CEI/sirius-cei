import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

const ChartFields = ({ handleChange, chart, editMode }) => (
	<Fragment>
		<TextField
			label="Chart title"
			name="title"
			type="text"
			margin="dense"
			fullWidth
			autoFocus
			required
			value={chart.title}
			onChange={handleChange}
		/>
		<TextField
			label="Description"
			name="description"
			type="text"
			margin="dense"
			fullWidth
			multiline
			value={chart.description}
			onChange={handleChange}
		/>
		<TextField
			label="Copy"
			name="copy"
			type="text"
			margin="dense"
			fullWidth
			multiline
			value={chart.copy}
			onChange={handleChange}
		/>
		<TextField
			label="Text for toggle button"
			name="toggleText"
			type="text"
			margin="dense"
			fullWidth
			required
			value={chart.toggleText}
			onChange={handleChange}
		/>
		<TextField
			label="Query"
			name="query"
			type="text"
			margin="dense"
			fullWidth
			value={chart.query}
			onChange={handleChange}
		/>
		<TextField
			label="Data source citation"
			name="citation"
			type="text"
			margin="dense"
			fullWidth
			value={chart.citation}
			onChange={handleChange}
		/>
		<TextField
			label="Notes"
			name="notes"
			type="text"
			margin="dense"
			fullWidth
			multiline
			value={chart.notes}
			onChange={handleChange}
		/>
	</Fragment>
)

export default ChartFields