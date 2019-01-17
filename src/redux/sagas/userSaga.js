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
		yield put({ type: 'FETCH_DATA_FAILURE' });
  }
}

function* fetchUserList() {
	try {
		let response = yield call(axios.get, '/api/user/list');
		yield put({ type: 'SET_USER_LIST', payload: response.data });
	} catch (error) {
		alert(`user list get request failed`, error);
	}
}

function* editUser() {
	
}

//deactivate user from user list
function* deactivateUser(action) {
	try {
		yield call(axios.put, `/api/user/deactivate/${action.payload}`);
		yield put( {type: 'GET_DATA', main: 'FETCH_USER_LIST'} );
	}
	catch(error) {
		alert('Error in updating user')
	}
}

//reactivate user from user list
function* reactivateUser(action) {
	try {
		yield call(axios.put, `/api/user/reactivate/${action.payload}`);
		yield put( {type: 'GET_DATA', main: 'FETCH_USER_LIST'} );
	}
	catch(error) {
		alert('Error in updating user')
	}
}

//delete user from user list
function* deleteUser(action) {
	try {
		yield call(axios.delete, `/api/user/${action.payload}`);
		yield put( { type: 'GET_DATA', main: 'FETCH_USER_LIST' } );
	}
		catch(error) {
			alert('Error deleting user');
		}
}

function* updateUsername(action) {
    const username = action.payload;
    try{
        const response = yield call(axios.put, `/api/user/new-username`, username );
    }
    catch (error) {
        alert('Error with forget password');
    }
}

function* userSaga() {
	yield takeLatest('FETCH_USER', fetchUser);
	yield takeEvery('FETCH_USER_LIST', fetchUserList);
	yield takeEvery('EDIT_USER', editUser);
	yield takeEvery('DELETE_USER', deleteUser);
	yield takeEvery('DEACTIVATE_USER', deactivateUser);
	yield takeEvery('REACTIVATE_USER', reactivateUser);
	yield takeEvery('UPDATE_USERNAME', updateUsername);
}

export default userSaga;