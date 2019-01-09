const errorMessage = (state = '', action) => {
	switch (action.type) {
	case 'CLEAR_ERRORS':
		return '';
	case 'AUTH_INPUT_ERROR':
		return 'Please fill out all required fields.';
	case 'INVALID_USERNAME':
		return 'Username cannot contain spaces or special characters.';
	case 'PASSWORD_TOO_SHORT':
		return 'Password must be at least eight characters.';
	case 'PASSWORD_MISMATCH':
		return 'Password fields must match.';
	case 'USERNAME_TAKEN':
		return 'That username is already taken. Please choose a different username, or go to the Login screen instead.';
	case 'LOGIN_FAILED':
		return 'Incorrect username or password. Please try again.';
	case 'AUTH_FAILED_NO_CODE':
		return 'Oops! Something went wrong... Is the server running?';
	case 'API_ERROR':
		return action.payload;
	default:
		return state;
	}
};

export default errorMessage;