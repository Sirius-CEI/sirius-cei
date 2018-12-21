import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

function* getOutcomeAreas() {
    try {
      let response = yield axios.get('/api/outcome-areas');
      // console.log('getOutcomeAreas response', response.data);
      yield put({ type: 'SET_OUTCOME_AREAS', payload: response.data });      
    } catch (error) {
      console.log(`outcome areas get request failed`, error);
			yield put({ type: 'API_ERROR', payload: error})
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