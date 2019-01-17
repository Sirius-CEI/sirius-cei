import axios from 'axios';
import { call, takeEvery } from 'redux-saga/effects';
  
function* editPassword(action) {
    console.log('Edit Password saga user', action.payload.username);
    const username = action.payload.username
    try {
        // axios asynch call to update password to server
        yield call(axios.put, `/api/user/new-password/${username}`, action.payload);
    }
    catch (error) {
        console.log('error with new password PUT request', error);
    }
}

function* forgotPassword(action) {
    console.log('forgot password', action.payload);
    const username = action.payload;
    try{
        const response = yield call(axios.post, `/api/user/password-reset`, username );
        console.log('password reset response data', response.data);
    }
    catch (error) {
        console.log('error with forgot password request', error);
    }
}

function* resetPassword(action) {
    console.log('forgot password', action.payload);
    const username = action.payload;
    try{
        const response = yield call(axios.put, `/api/user/new-password`, username );
        console.log('password reset response data', response.data);
    }
    catch (error) {
        console.log('error with forgot password request', error);
    }
}

function* getToken(action) {
    console.log('in get token', action.payload);
    try {
      const response = yield axios.get(`/api/user/password-reset/${action.payload}`);
      console.log('get Token response data', response.data);
    } catch (error) {
      console.log('Get Token request failed', error);
    }
}

function* passwordSaga() {
    yield takeEvery('FORGOT_PASSWORD', forgotPassword);
    yield takeEvery('RESET_PASSWORD', resetPassword);
    yield takeEvery('GET_TOKEN', getToken);
  yield takeEvery('RESET_PASSWORD', editPassword);
}

export default passwordSaga;