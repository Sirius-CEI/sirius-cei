import axios from 'axios';
import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
		// from the server session (req.user)
		yield put({ type: 'FETCH_DATA_BEGIN' });
    const response = yield call(axios.get, 'api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
		yield put({ type: 'SET_USER', payload: response.data });
		yield put({ type: 'FETCH_DATA_SUCCESS' });
  } catch (error) {
		console.log('User get request failed', error);
		yield put({ type: 'FETCH_DATA_FAILURE' });
  }
}

function* fetchUserList() {
	try {
		let response = yield call(axios.get, '/api/user/list');
		// console.log('getUserList response', response.data);
		yield put({ type: 'SET_USER_LIST', payload: response.data });
	} catch (error) {
		console.log(`user list get request failed`, error);
	}
}

function* editUser() {
	
}

//deactivate user from user list
function* deactivateUser(action) {
	console.log('in deactivateUserSaga', action.payload);
	try {
		yield call(axios.put, `/api/user/deactivate/${action.payload}`);
		yield put( {type: 'GET_DATA', main: 'FETCH_USER_LIST'} );
	}
	catch(error) {
		console.log('error with put request to /api/user/deactivate');
		alert('Error in updating user')
	}
}

//reactivate user from user list
function* reactivateUser(action) {
	console.log('in reactivateUserSaga', action.payload);
	try {
		yield call(axios.put, `/api/user/reactivate/${action.payload}`);
		yield put( {type: 'GET_DATA', main: 'FETCH_USER_LIST'} );
	}
	catch(error) {
		console.log('error with put request to /api/user/reactivate');
		alert('Error in updating user')
	}
}

//delete user from user list
function* deleteUser(action) {
	console.log('in deleteUserSaga', action.payload);
	try {
		yield call(axios.delete, `/api/user/${action.payload}`);
		yield put( { type: 'GET_DATA', main: 'FETCH_USER_LIST' } );
	}
		catch(error) {
			console.log('error with delete request to /api/user');
			alert('Error deleting user');
		}
}

function* userSaga() {
	yield takeLatest('FETCH_USER', fetchUser);
	yield takeEvery('FETCH_USER_LIST', fetchUserList);
	yield takeEvery('EDIT_USER', editUser);
	yield takeEvery('DELETE_USER', deleteUser);
	yield takeEvery('DEACTIVATE_USER', deactivateUser);
	yield takeEvery('REACTIVATE_USER', reactivateUser);
}

export default userSaga;