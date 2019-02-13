import React, { Fragment } from 'react';
import {
	IconButton,
	TextField,
	InputAdornment
} from '@material-ui/core'
import {
	AccountCircle,
	Visibility,
	VisibilityOff,
	Lock
} from '@material-ui/icons'

const LoginFields = props => {
	console.log(props)
	const { username, password, showPassword, handleChange, handleTogglePassword } = props;
	return (
		<Fragment>
			<TextField
				required
				autoFocus
				fullWidth
				variant="outlined"
				id="username"
				label="email"
				name="username"
				type={username === "admin" ? "text" : "email"}
				margin="normal"
				value={username}
				onChange={(e)=>handleChange(e)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AccountCircle />
						</InputAdornment>
					),
				}}
			/>
			<TextField
				required
				autoFocus
				fullWidth
				variant="outlined"
				id="password"
				label="password"
				name="password"
				type={showPassword ? "text" : "password"}
				margin="normal"
				value={password}
				onChange={(e)=>handleChange(e)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Lock />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="Toggle password visibility"
								onClick={() => handleTogglePassword()}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
		</Fragment>
	)
}

export default LoginFields;