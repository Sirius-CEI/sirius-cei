import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const IndicatorFields = ({ outcomes, handleChange, indicator, editMode }) => (
	<Fragment>
		<TextField
			label="Indicator title"
			name="title"
			type="text"
			margin="dense"
			fullWidth
			autoFocus
			value={indicator.title}
			onChange={handleChange}
		/>
		<TextField
			label="Chart title"
			name="chart_title"
			type="text"
			margin="dense"
			fullWidth
			autoFocus
			value={indicator.chart_title}
			onChange={handleChange}
		/>
		<TextField
			label="What This Means Copy"
			name="what_this_means_copy"
			type="text"
			margin="dense"
			fullWidth
			multiline
			value={indicator.what_this_means_copy}
			onChange={handleChange}
		/>
		<TextField
			label="Why This Matters Copy"
			name="why_this_matters_copy"
			type="text"
			margin="dense"
			fullWidth
			multiline
			value={indicator.why_this_matters_copy}
			onChange={handleChange}
		/>
		<TextField
			label="Trend"
			name="trend"
			select
			margin="dense"
			fullWidth
			required
			value={indicator.trend}
			onChange={handleChange}
		>
			<MenuItem value="positive">positive</MenuItem>
			<MenuItem value="negative">negative</MenuItem>
			<MenuItem value="neutral">neutral</MenuItem>
		</TextField>
		<TextField
			label="Trend Copy"
			name="trend_copy"
			type="text"
			margin="dense"
			fullWidth
			multiline
			value={indicator.trend_copy}
			onChange={handleChange}
		/>
		<TextField
			label="Outcome area"
			name="outcome_id"
			select
			margin="dense"
			fullWidth
			required
			value={indicator.outcome_id}
			onChange={handleChange}
		>
			{outcomes.map((item) => (
				<MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
			))}
		</TextField>
	</Fragment>
)

const mapStateToProps = ({outcomes}) => ({ outcomes: outcomes })

export default connect(mapStateToProps)(IndicatorFields);