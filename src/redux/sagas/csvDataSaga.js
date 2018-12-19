import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* addCsv(action) {
    console.log('Add Release saga', action);
    try {
      yield call( axios.post, '/data-indicators', action.payload );
      alert('Success adding CSV!');
      yield put( { type: 'FETCH_CSV' } );
    }
    catch(error) {
      console.log('Error adding Release', error);
      alert('Error adding CSV');
    }
  }

  function* getCsv() {
    try {
      const response = yield axios.get('/data-indicators');
      console.log('get csvSaga response', response.data);
      yield put({ type: 'SET_CSV', payload: response.data });      
    } catch (error) {
      console.log('csv get request failed', error);
    }
}

function* csvSaga() {
    yield takeEvery('ADD_CSV_DATA', addCsv);
    yield takeEvery('FETCH_CSV', getCsv);
}

export default csvSaga;
