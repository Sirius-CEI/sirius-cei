import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* getOutcomeAreas() {
    try {
			yield put({ type: 'FETCH_DATA_BEGIN'})
      let response = yield axios.get('/api/outcome-areas');
      // console.log('getOutcomeAreas response', response.data);
			yield put({ type: 'SET_OUTCOME_AREAS', payload: response.data });
			yield put({ type: 'FETCH_DATA_SUCCESS' })
    } catch (error) {
      console.log(`outcome areas get request failed`, error);
			yield put({ type: 'API_ERROR', payload: error});
			yield put({ type: 'FETCH_DATA_FAILURE' });
    }
}

function* postOutcomeArea(action) {
	try {
		let response = yield axios.post('/api/outcome-areas', { payload: action.payload });
		console.log(response);
		if (response.data.error) { yield put({ type: 'API_ERROR', payload: response.data.error.message }) }
		yield put({ type: 'GET_OUTCOME_AREAS' });
	} catch (error) {
		console.log(`outcome area post request failed`, error);
		yield put({ type: 'API_ERROR', payload: error})
	}
}

function* outcomeAreaSaga() {
	yield takeEvery('GET_OUTCOME_AREAS', getOutcomeAreas);
	yield takeEvery('POST_OUTCOME_AREA', postOutcomeArea);
}

export default outcomeAreaSaga;