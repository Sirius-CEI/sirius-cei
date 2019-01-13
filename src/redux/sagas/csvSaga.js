import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* addCsv(action) {
    console.log('Add Release saga', action);
    try {
        yield call( axios.post, '/api/csv', action.payload );
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
      const response = yield axios.get('/api/csv');
      console.log('get csvSaga response', response.data);
      yield put({ type: 'SET_CSV', payload: response.data });      
    } catch (error) {
      console.log('csv get request failed', error);
    }
}

function* getAllCsv() {
    try {
      const response = yield axios.get('/api/csv/all');
      console.log('get csvSaga response', response.data);
      yield put({ type: 'SET_CHART_DATA', payload: response.data });      
    } catch (error) {
      console.log('csv get request failed', error);
    }
}

function* deleteCsv(action) {
  console.log('Delete saga to remove latest csv: ', action.payload);
  try {
      yield call(axios.delete, `/api/csv/${action.payload}`);
      alert('Deleted CSV');
      yield put( { type: 'FETCH_CSV' } );
  }
      catch (error) {
          console.log('error with delete request to /data-indicators');
          alert('Error Deleting CSV');
      }
}

function* csvSaga() {
    yield takeEvery('ADD_CSV_DATA', addCsv);
    yield takeEvery('FETCH_CSV', getCsv);
    yield takeEvery('FETCH_CSVDATA', getAllCsv)
    yield takeEvery('DELETE_CSV', deleteCsv);
}

export default csvSaga;