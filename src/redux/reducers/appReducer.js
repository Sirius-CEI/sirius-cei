import { combineReducers } from 'redux';
import errors from './errorsReducer';
import user from './userReducer';

const loading = (state = null, action) => {
	switch (action.type) {
		case 'FETCH_DATA_BEGIN':
			return true;
		case 'FETCH_DATA_SUCCESS':
			return false;
		case 'FETCH_DATA_FAILURE':
			return false;
		default:
			return state;
	}
}

const appReducer = combineReducers({
  errors, // error messages
	user, // will have an id and username if someone is logged in
	loading,
});

export default appReducer;