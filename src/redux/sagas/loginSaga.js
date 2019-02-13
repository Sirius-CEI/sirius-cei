// import { put, call, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { apiError, apiStart, apiEnd, clearErrors } from "../actions/api";

// // worker Saga: will be fired on "LOGIN" actions
// function* loginUser(action) {
//   try {
// 		// clear any existing error on the login page
// 		yield put(apiStart('Login'));
// 		yield put(clearErrors('Login'));
//     const config = {
//       headers: { 'Content-Type': 'application/json' },
//       withCredentials: true,
//     };

//     // send the action.payload as the body
//     // the config includes credentials which
//     // allow the server session to recognize the user
//     yield call(axios.post, 'api/user/login', action.payload, config);
    
//     // after the user has logged in
//     // get the user information from the server
//     yield put({type: 'FETCH_USER'});
//   } catch (error) {
//     if (error.response.status === 401) {
//       // The 401 is the error status sent from passport
//       // if user isn't in the database or
//       // if the username and password don't match in the database
// 			yield put(apiError(error, `Login`));
//     } else {
//       // Got an error that wasn't a 401
//       // Could be anything, but most common cause is the server is not started
// 			yield put(apiError(error, `Login`));
//     } 
//   } finally {
// 		yield put (apiEnd('Login'))
// 	}
// }

// // worker Saga: will be fired on "LOGOUT" actions
// function* logoutUser(action) {
//   try {
//     const config = {
//       headers: { 'Content-Type': 'application/json' },
//       withCredentials: true,
//     };

//     // the config includes credentials which
//     // allow the server session to recognize the user
//     // when the server recognizes the user session
//     // it will end the session
//     yield call(axios.post, 'api/user/logout', config);

//     // now that the session has ended on the server
//     // remove the client-side user object to let
//     // the client-side code know the user is logged out
//     yield put({ type: 'UNSET_USER' });

//   } catch (error) {
//     alert('Error with user logout:', error);
//   }
// }

// function* loginSaga() {
//   yield takeLatest('LOGIN', loginUser);
//   yield takeLatest('LOGOUT', logoutUser);
// }

// export default loginSaga;
