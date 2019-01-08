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
    const response = yield axios.get('api/user', config);

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
		yield put({ type: 'FETCH_DATA_BEGIN'})
		let response = yield axios.get('/api/user/list');
		console.log('getUserList response', response.data);
		yield put({ type: 'SET_USER_LIST', payload: response.data });
		yield put({ type: 'FETCH_DATA_SUCCESS' })
	} catch (error) {
		console.log(`user list get request failed`, error);
		yield put({ type: 'API_ERROR', payload: error});
		yield put({ type: 'FETCH_DATA_FAILURE' });
	}
}

function* editUser() {
	
}

function* deleteUser(action) {
	console.log('in deleteUserSaga', action.payload);
	try {
		yield call(axios.delete, `api/user/${action.payload}`);
		yield put( { type: 'FETCH_USER_LIST' } );
	}
		catch(error) {
			console.log('error with delete request to /user');
			alert('Error deleting user');
		}
}

function* userSaga() {
	yield takeLatest('FETCH_USER', fetchUser);
	yield takeEvery('FETCH_USER_LIST', fetchUserList);
	yield takeEvery('EDIT_USER', editUser);
	yield takeEvery('DELETE_USER', deleteUser);
}

export default userSaga;