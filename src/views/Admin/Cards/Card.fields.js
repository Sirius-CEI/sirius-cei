import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'

const CardFields = ({ handleChange, newCard, outcomes }) => (
	<Fragment>
		<TextField 
				id="card-title" 
				type='text'
				label="Title" 
				name="title" 
				margin="dense" 
				value={newCard.title} 
				onChange={handleChange}
				fullWidth
				autoFocus
				required
		/>
		<TextField 
				id="card-image" 
				type='url' 
				label="Image address" 
				name="image" 
				margin="dense" 
				value={newCard.image} 
				onChange={handleChange}
				fullWidth
				required
		/>
		<TextField 
				id="card-url" 
				type='url'
				label="Link address" 
				name="url" 
				margin="dense" 
				value={newCard.url} 
				onChange={handleChange}
				fullWidth
				required
		/>
		<TextField
			label="Outcome area"
			name="outcome_id"
			select
			margin="dense"
			fullWidth
			required
			value={newCard.outcome_id}
			onChange={handleChange}
		>
			{outcomes.map((item) => (
				<MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
			))}
		</TextField>
	</Fragment>
)

const mapStateToProps = ({ outcomes }) => ({
	outcomes: outcomes
})

export default connect(mapStateToProps)(CardFields);