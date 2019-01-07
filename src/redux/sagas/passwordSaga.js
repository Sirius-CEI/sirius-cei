import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
  
function* editPassword(action) {
console.log('Edit password saga', action.payload);
try {
    yield call(axios.put, '/password', action.payload);
    alert('Successfully Changed Password')
}
    catch (error) {
        console.log('error with Password PUT request', error);
        alert('Error Changing Password')
    }
}

function* forgotPassword(action) {
    console.log('forgot password', action.payload);
    const userId = action.payload;
    try{
        yield call(axios.post, `/forgot-password`, userId);
    }
    catch (error) {
        console.log('error with forgot password request', error);
    }
}

function* passwordSaga() {
  yield takeEvery('EDIT_PASSWORD', editPassword);
  yield takeEvery('FORGOT_PASSWORD', forgotPassword)
}

export default passwordSaga;