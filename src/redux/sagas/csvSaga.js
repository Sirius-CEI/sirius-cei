import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* addCsv(action) {
	console.log('Add csv saga', action);
	const { fileInfo, payload } = action;
	try {
		yield call( axios.post, '/api/csv', { payload: payload, fileInfo: fileInfo } );
		alert('Success adding CSV!');
		yield put( { type: 'FETCH_CSV' } );
	}
	catch(error) {
		console.log('Error adding csv', error);
		alert('Error adding csv');
	}
}

function* getCsv() {
	try {
	  const response = yield call(axios.get, '/api/csv');
	  console.log('get csvSaga response', response.data);
	  yield put({ type: 'SET_CSV', payload: response.data });
	} catch (error) {
	  console.log('csv get request failed', error);
	}
}

function* getAllCsv(action) {

	try {
			yield put({ type: 'FETCH_DATA_BEGIN' })
	const response = yield call(axios.get, `/api/csv/all`);
	// console.log('get cardSaga response', response.data);
			yield put({ type: 'SET_CHART_DATA', payload: response.data });
			yield put({ type: 'FETCH_DATA_SUCCESS' })
	} catch (error) {
			console.log('Chart data get request failed', error);
			yield put({ type: 'FETCH_DATA_FAILURE' })
	}
	// try {
	//     let response = yield call(axios.get, `/api/csv/all`);
	//         console.log(response);
	//           if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error }) }
	//           yield put({ type: 'SET_CHART_DATA', payload: response.data });
	//   } catch (error) {
	//           console.log(`charts get request failed`, error);
	//           yield put({ type: 'API_ERROR', payload: error });
	//   }
}

function* deleteCsv(action) {
  console.log('Delete saga to remove latest csv: ', action.payload);
  try {
	  yield call(axios.delete, `/api/csv/${action.payload}`);
	  alert('Deleted csv');
	  yield put( { type: 'FETCH_CSV' } );
  }
	  catch (error) {
		  console.log('error with delete request to /data-indicators');
		  alert('Error deleting csv');
	  }
}

function* csvSaga() {
	yield takeEvery('ADD_CSV_DATA', addCsv);
	yield takeEvery('FETCH_CSV', getCsv);
	yield takeEvery('FETCH_ALL_CSV', getAllCsv)
	yield takeEvery('DELETE_CSV', deleteCsv);
}

export default csvSaga;