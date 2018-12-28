import { combineReducers } from 'redux';
import errors from './errorsReducer';
import user from './userReducer';
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
  errors, // error messages
  // loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
	cards,
  // annualRelease,
  outcomes //will have outcome area data
});

export default rootReducer;
