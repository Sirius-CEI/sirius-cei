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
    const response = yield axios.get(`/forgot-password/${userId}`);
    console.log('in forgot password generator function', response.data);
    yield put({ type: 'SET_USER', payload: response.data})
}

function* getCards() {
    try {
      const response = yield axios.get('/cards');
      console.log('get cardSaga response', response.data);
      yield put({ type: 'SET_CARDS', payload: response.data });      
    } catch (error) {
      console.log('Card get request failed', error);
    }
}

function* passwordSaga() {
  yield takeEvery('EDIT_PASSWORD', editPassword);
  yield takeEvery('FORGOT_PASSWORD', forgotPassword)
}

export default passwordSaga;