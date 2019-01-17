import axios from 'axios';
import { call, takeEvery } from 'redux-saga/effects';

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
}

export default passwordSaga;