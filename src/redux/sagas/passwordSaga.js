import axios from 'axios';
import { call, takeEvery } from 'redux-saga/effects';
  
function* editPassword(action) {
console.log('Edit password saga', action.payload);
try {
    yield call(axios.put, '/password', action.payload);
}
    catch (error) {
        console.log('error with Password PUT request', error);
    }
}

function* passwordSaga() {
  yield takeEvery('EDIT_PASSWORD', editPassword);
}

export default passwordSaga;