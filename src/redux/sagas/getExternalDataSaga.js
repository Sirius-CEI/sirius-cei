import axios from 'axios';
import { call, takeEvery } from 'redux-saga/effects';

function* getQwiData() {
    console.log('QWI Data call');
    try {
      const response = yield axios.get('/qwi/geographies');
      console.log('get qwi data response', response.data);
      yield call( axios.post, '/qwi/geographies', response.data );
    } catch (error) {
      console.log('Card get request failed', error);
    }
}

function* qwiData() {
  yield takeEvery('GET_QWI_DATA', getQwiData);
}

export default qwiData;