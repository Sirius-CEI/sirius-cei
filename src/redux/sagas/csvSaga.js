import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* addCsv(action) {
	try {
		yield call( axios.post, '/api/csv', action );
		alert('Success adding CSV!');
		yield put( { type: 'FETCH_CSV' } );
	}
	catch(error) {
		alert('Error adding CSV');
	}
}

function* getCsv() {
	try {
	  const response = yield call(axios.get, '/api/csv');
	  yield put({ type: 'SET_CSV', payload: response.data });
	} catch (error) {
		alert('csv get request failed', error);
	}
}

function* getCsvData() {
	try {
		const response = yield call(axios.get, '/api/csv/data');
		response.data.error ? yield put({ type: 'API_ERROR', payload: response.data.error })
		: yield put({ type: 'SET_CHART_DATA', payload: response.data })
	} catch (error) {
		yield put({ type: 'API_ERROR', payload: error })
	}
}

function* deleteCsv(action) {
  try {
	  yield call(axios.delete, `/api/csv/${action.payload}`);
	  alert('Deleted CSV');
	  yield put( { type: 'FETCH_CSV' } );
  }
	  catch (error) {
		  alert('Error Deleting CSV');
	  }
}

function* csvSaga() {
	yield takeEvery('ADD_CSV_DATA', addCsv);
	yield takeEvery('FETCH_CSV_DATA', getCsvData);
	yield takeEvery('FETCH_CSV', getCsv);
	yield takeEvery('DELETE_CSV', deleteCsv);
}

export default csvSaga;