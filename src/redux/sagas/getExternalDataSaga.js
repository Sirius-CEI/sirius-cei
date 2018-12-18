import axios from 'axios';
import { call, takeEvery } from 'redux-saga/effects';

function* getQwiData() {
    console.log('QWI Data call');
    try {
      const response = yield axios.get('/qwi/indicators');
      console.log('get indicator data response', response.data);
      yield call( axios.post, '/qwi/indicators', response.data );
    } catch (error) {
      console.log('Card get request failed', error);
    }
}

function* qwiData() {
  yield takeEvery('GET_QWI_DATA', getQwiData);
}

export default qwiData;