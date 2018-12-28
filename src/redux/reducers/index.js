import { combineReducers } from 'redux';
import errors from './errorsReducer';
import user from './userReducer';
import users from './userListReducer';
import cards from './cardReducer';
import outcomes from './outcomeAreaReducer';
import appState from './appReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
	appState,
	cards,
	errors, // error messages
	outcomes, // outcome area data
	user, // will have an id and username if someone is logged in
	users,
});

export default rootReducer;
