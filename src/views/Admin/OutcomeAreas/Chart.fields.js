import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const ChartFields = ({ handleChange, chart, editMode }) => (
	<Fragment>
		<TextField
			label="Chart Type"
			name="type"
			select
			margin="dense"
			fullWidth
			autoFocus
			required
			value={chart.type}
			onChange={handleChange}
			>
			<MenuItem value="line">line</MenuItem>
			<MenuItem value="map">map</MenuItem>
		</TextField>
		{(chart.type === 'map') && <TextField
			label="Map Level"
			name="map_level"
			select
			type="text"
			margin="dense"
			fullWidth
			value={chart.map_level}
			onChange={handleChange}
			>
			<MenuItem value="tract">tract</MenuItem>
			<MenuItem value="county">county</MenuItem>
			<MenuItem value="MSA">MSA</MenuItem>
			<MenuItem value="state">state</MenuItem>
		</TextField>}
		<TextField
			label="Data source citation"
			name="citation"
			type="text"
			margin="dense"
			fullWidth
			multiline
			value={chart.citation}
			onChange={handleChange}
		/>
	</Fragment>
)

export default ChartFields