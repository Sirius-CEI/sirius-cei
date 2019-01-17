import axios from 'axios';
import { call, takeEvery } from 'redux-saga/effects';

function* forgotPassword(action) {
    const username = action.payload;
    try{
        const response = yield call(axios.post, `/api/user/password-reset`, username );
    }
    catch (error) {
    }
}

function* resetPassword(action) {
    const username = action.payload;
    try{
        const response = yield call(axios.put, `/api/user/new-password`, username );
    }
    catch (error) {
    }
}

function* getToken(action) {
    try {
      const response = yield axios.get(`/api/user/password-reset/${action.payload}`);
    } catch (error) {
    }
}

function* passwordSaga() {
    yield takeEvery('FORGOT_PASSWORD', forgotPassword);
    yield takeEvery('RESET_PASSWORD', resetPassword);
    yield takeEvery('GET_TOKEN', getToken);
}

export default passwordSaga;