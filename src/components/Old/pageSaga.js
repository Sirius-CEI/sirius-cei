import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* getPages() {
    try {
      const response = yield axios.get('/pages');
      console.log('get pageSaga response', response.data);
      yield put({ type: 'SET_PAGES', payload: response.data });      
    } catch (error) {
      console.log('Pages get request failed', error);
    }
}

function* pageSaga() {
  yield takeEvery('GET_PAGES', getPages);
}

export default pageSaga;