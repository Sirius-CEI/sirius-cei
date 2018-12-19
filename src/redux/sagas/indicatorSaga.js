import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* getindicators() {
    try {
      const response = yield axios.get('/indicators');
      console.log('get indicatorSaga response', response.data);
      yield put({ type: 'SET_INDICATORS', payload: response.data });      
    } catch (error) {
      console.log('indicators get request failed', error);
    }
}

function* indicatorSaga() {
  yield takeEvery('GET_INDICATORS', getindicators);
}

export default indicatorSaga;